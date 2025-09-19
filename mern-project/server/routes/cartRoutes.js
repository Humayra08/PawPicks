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

router.post('/session', generateSession);
router.get('/:sessionId', getCart);
router.post('/add', addToCart);
router.put('/update', updateCartItem);
router.delete('/remove', removeFromCart);
router.delete('/clear/:sessionId', clearCart);

export default router;