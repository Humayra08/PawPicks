import { v4 as uuidv4 } from 'uuid';
import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';

// Generate a sessionId for guest users
const generateSessionId = () => {
  return `guest_${uuidv4()}`;
};

const attachTotals = (cart) => {
  const { totalItems, totalAmount } = cart.computeTotals();
  const payload = cart.toObject();
  payload.totalItems = totalItems;
  payload.totalAmount = totalAmount;
  return payload;
};

// Fetch cart by sessionId
export const getCart = async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required'
      });
    }

    let cart = await Cart.findOne({ sessionId }).populate('items.product');

    if (!cart) {
      cart = new Cart({ sessionId, items: [] });
      await cart.save();
    }

    res.json({
      success: true,
      data: attachTotals(cart)
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch cart',
      error: error.message
    });
  }
};

// Add item to the cart
export const addToCart = async (req, res) => {
  try {
    const { sessionId, productId, quantity = 1, selectedColor = '', selectedVariant = '' } = req.body;

    if (!sessionId || !productId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID and Product ID are required'
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock'
      });
    }

    let cart = await Cart.findOne({ sessionId });
    if (!cart) {
      cart = new Cart({ sessionId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) =>
        item.product.toString() === productId &&
        item.selectedColor === selectedColor &&
        item.selectedVariant === selectedVariant
    );

    if (existingItemIndex > -1) {
      const newQuantity = cart.items[existingItemIndex].quantity + quantity;

      if (newQuantity > product.stock) {
        return res.status(400).json({
          success: false,
          message: 'Cannot add more items than available stock'
        });
      }

      cart.items[existingItemIndex].quantity = newQuantity;
      cart.items[existingItemIndex].price = product.price; // refresh price snapshot
    } else {
      cart.items.push({
        product: productId,
        quantity,
        selectedColor,
        selectedVariant,
        price: product.price
      });
    }

    await cart.save();
    await cart.populate('items.product');

    res.json({
      success: true,
      message: 'Item added to cart successfully',
      data: attachTotals(cart)
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add item to cart',
      error: error.message
    });
  }
};

// Update cart item
export const updateCartItem = async (req, res) => {
  try {
    const { sessionId, productId, quantity, selectedColor = '', selectedVariant = '' } = req.body;

    if (!sessionId || !productId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Session ID, Product ID, and quantity are required'
      });
    }

    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) =>
        item.product.toString() === productId &&
        item.selectedColor === selectedColor &&
        item.selectedVariant === selectedVariant
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      if (quantity > product.stock) {
        return res.status(400).json({
          success: false,
          message: 'Quantity exceeds available stock'
        });
      }

      cart.items[itemIndex].quantity = quantity;
      cart.items[itemIndex].price = product.price; // refresh price snapshot
    }

    await cart.save();
    await cart.populate('items.product');

    res.json({
      success: true,
      message: 'Cart updated successfully',
      data: attachTotals(cart)
    });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update cart',
      error: error.message
    });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { sessionId, productId, selectedColor = '', selectedVariant = '' } = req.body;

    if (!sessionId || !productId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID and Product ID are required'
      });
    }

    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.items = cart.items.filter(
      (item) =>
        !(
          item.product.toString() === productId &&
          item.selectedColor === selectedColor &&
          item.selectedVariant === selectedVariant
        )
    );

    await cart.save();
    await cart.populate('items.product');

    res.json({
      success: true,
      message: 'Item removed from cart successfully',
      data: attachTotals(cart)
    });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove item from cart',
      error: error.message
    });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required'
      });
    }

    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.items = [];
    await cart.save();

    res.json({
      success: true,
      message: 'Cart cleared successfully',
      data: attachTotals(cart)
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear cart',
      error: error.message
    });
  }
};

// Generate session
export const generateSession = async (_req, res) => {
  try {
    const sessionId = generateSessionId();

    res.json({
      success: true,
      data: { sessionId }
    });
  } catch (error) {
    console.error('Error generating session:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate session',
      error: error.message
    });
  }
};