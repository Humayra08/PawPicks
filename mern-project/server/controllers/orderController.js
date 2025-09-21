import mongoose from 'mongoose';
import Order from '../models/orderModel.js';
import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';

export const placeOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { items, total, shippingAddress, sessionId, paymentMethod } = req.body;
    const userId = req.user?.userId;

    // Validate core fields
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }
    if (!shippingAddress?.fullName || !shippingAddress?.email || !shippingAddress?.address || !shippingAddress?.contactNumber) {
      return res.status(400).json({ success: false, message: 'Incomplete shipping information' });
    }
    if (!sessionId) {
      return res.status(400).json({ success: false, message: 'Session ID is required' });
    }

    // Fetch the cart based on sessionId
    const cart = await Cart.findOne({ sessionId }).session(session);
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    // Rebuild order items from the cart and validate stock
    const orderItems = [];
    let computedTotal = 0;

    for (const cItem of cart.items) {
      const product = await Product.findById(cItem.product).session(session);
      if (!product) {
        await session.abortTransaction();
        return res.status(404).json({ success: false, message: 'A product in your cart no longer exists' });
      }

      if (product.stock < cItem.quantity) {
        await session.abortTransaction();
        return res
          .status(400)
          .json({ success: false, message: `Insufficient stock for ${product.title}. In stock: ${product.stock}` });
      }

      // Use current product price to prevent client tampering
      const unitPrice = product.price;
      computedTotal += unitPrice * cItem.quantity;

      orderItems.push({
        productId: product._id,
        quantity: cItem.quantity,
        price: unitPrice,
        selectedColor: cItem.selectedColor || '',
        selectedVariant: cItem.selectedVariant || ''
      });
    }

    // Optional: compare with client-provided total (tolerate small rounding differences)
    const diff = Math.abs((total ?? 0) - computedTotal);
    if (diff > 0.01) {
      // Not blocking, but inform client of recomputed value
      console.warn('Client total mismatch. Using server-computed total.');
    }

    // Deduct stock
    for (const item of orderItems) {
      const prod = await Product.findById(item.productId).session(session);
      prod.stock -= item.quantity;
      if (prod.stock < 0) {
        await session.abortTransaction();
        return res.status(400).json({ success: false, message: `Insufficient stock for ${prod.title}` });
      }
      await prod.save({ session });
    }

    // Create order
    const order = new Order({
      userId,
      sessionId,
      items: orderItems,
      total: computedTotal,
      shippingAddress,
      paymentMethod: (paymentMethod || 'COD').toUpperCase(),
      status: 'pending'
    });

    await order.save({ session });

    // Clear cart after placing order
    await Cart.deleteOne({ sessionId }).session(session);

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
      message: 'Order placed successfully',
      order
    });
  } catch (error) {
    console.error('Error placing order:', error);
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ success: false, message: error.message || 'An error occurred while placing your order.' });
  }
};

export const getOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user?.userId;

    const order = await Order.findOne({ _id: orderId, userId });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({
      success: true,
      data: { status: order.status, updatedAt: order.updatedAt }
    });
  } catch (error) {
    console.error('Error fetching order status:', error);
    res.status(500).json({ success: false, message: 'Error fetching order status' });
  }
};