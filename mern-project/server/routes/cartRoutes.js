const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middleware/auth'); // Your auth middleware

// All routes use authentication
router.post('/add', auth, cartController.addToCart);
router.get('/', auth, cartController.getCart);
router.post('/remove', auth, cartController.removeFromCart);
router.post('/update', auth, cartController.updateCartItem);

module.exports = router;