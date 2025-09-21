import express from 'express';
import { protect } from '../middleware/auth.js';
import { placeOrder, getOrderStatus } from '../controllers/orderController.js';

const router = express.Router();

router.post('/checkout', protect, placeOrder);
router.get('/:orderId/status', protect, getOrderStatus);

export default router;