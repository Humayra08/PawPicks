import express from 'express';
import {
  getAllProducts,
  getProductById,
  getProductBySlug,
  getProductsByCategory,
  getProductsByType,
  searchProducts,
  getFeaturedProducts
  // Commented out admin functions for now
  // createProduct,
  // updateProduct,
  // deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

// ----- PUBLIC ROUTES -----
// Routes that don't require authentication

// Get all products with optional filtering and sorting
// Example: GET /api/products?category=Pet Food&sort=price-low&minPrice=100&maxPrice=500
router.get('/', getAllProducts);

// Search products by text query
// Example: GET /api/products/search?q=cat food
router.get('/search', searchProducts);

// Get featured products (highly rated, popular items)
// Example: GET /api/products/featured
router.get('/featured', getFeaturedProducts);

// Get products by category
// Example: GET /api/products/category/Pet Food
router.get('/category/:category', getProductsByCategory);

// Get products by type (food or toy)
// Example: GET /api/products/type/food
router.get('/type/:type', getProductsByType);

// Get single product by slug (for SEO-friendly URLs)
// Example: GET /api/products/slug/fillet-o-lakes-kit-cat
router.get('/slug/:slug', getProductBySlug);

// Get single product by MongoDB ID
// Example: GET /api/products/64f7e8b9c8d5a1b2c3d4e5f6
router.get('/:id', getProductById);

// ----- ADMIN ROUTES (COMMENTED OUT FOR NOW) -----
// Uncomment these when you want to implement admin features

// Create new product
// router.post('/', createProduct);

// Update existing product
// router.put('/:id', updateProduct);

// Delete product (soft delete)
// router.delete('/:id', deleteProduct);

export default router;