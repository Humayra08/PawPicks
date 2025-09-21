import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  generateSession
} from '../controllers/cartController.js';

const router = express.Router();

// Session endpoints first so '/session' doesn't get caught by '/:sessionId'
router.post('/session', generateSession);

// Cart CRUD by sessionId
router.get('/:sessionId', getCart);
router.post('/add', addToCart);
router.put('/update', updateCartItem);
router.delete('/remove', removeFromCart);
router.delete('/clear/:sessionId', clearCart);

export default router;