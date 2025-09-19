import express from 'express';
import {
  getAllProducts,
  getProductById,
  getProductBySlug,
  getProductsByCategory,
  getProductsByType,
  searchProducts,
  getFeaturedProducts
  //admin function
  // createProduct,
  // updateProduct,
  // deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);

router.get('/search', searchProducts);

router.get('/featured', getFeaturedProducts);

router.get('/category/:category', getProductsByCategory);

router.get('/type/:type', getProductsByType);

router.get('/slug/:slug', getProductBySlug);


router.get('/:id', getProductById);

// ----- ADMIN ROUTE-----

// Create new product
// router.post('/', createProduct);

// Update existing product
// router.put('/:id', updateProduct);

// Delete product (soft delete)
// router.delete('/:id', deleteProduct);

export default router;