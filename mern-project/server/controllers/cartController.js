const Cart = require('../models/cart');
const Product = require('../models/Product');

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id; // req.user set by auth middleware

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    // Calculate total price
    let totalPrice = 0;
    await cart.populate('items.product');
    cart.items.forEach(item => {
      if (item.product && item.product.price) {
        totalPrice += item.quantity * item.product.price;
      }
    });

    res.json({ success: true, cart, totalPrice });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get user's cart
exports.getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) return res.json({ items: [], totalPrice: 0 });

    // Calculate total price
    let totalPrice = 0;
    cart.items.forEach(item => {
      if (item.product && item.product.price) {
        totalPrice += item.quantity * item.product.price;
      }
    });

    res.json({
      items: cart.items,
      totalPrice,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;
    let cart = await Cart.findOne({ user: userId });
    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();

    // Calculate total price
    let totalPrice = 0;
    await cart.populate('items.product');
    cart.items.forEach(item => {
      if (item.product && item.product.price) {
        totalPrice += item.quantity * item.product.price;
      }
    });

    res.json({ success: true, cart, totalPrice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;
    let cart = await Cart.findOne({ user: userId });
    const item = cart.items.find(item => item.product.toString() === productId);
    if (item) {
      item.quantity = quantity;
      await cart.save();
    }

    // Calculate total price
    let totalPrice = 0;
    await cart.populate('items.product');
    cart.items.forEach(item => {
      if (item.product && item.product.price) {
        totalPrice += item.quantity * item.product.price;
      }
    });

    res.json({ success: true, cart, totalPrice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};