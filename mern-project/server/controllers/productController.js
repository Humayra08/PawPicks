import Product from '../models/productsModel.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getAllProducts = async (req, res) => {
  try {
    // Get query parameters for filtering
    const { category, type, brand, minPrice, maxPrice, sort } = req.query;
    
    // Build filter object
    let filter = { isActive: true };
    
    if (category) {
      filter.category = new RegExp(category, 'i');
    }
    
    if (type) {
      filter.type = type.toLowerCase();
    }
    
    if (brand) {
      filter.brand = new RegExp(brand, 'i');
    }
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    // Build sort object
    let sortObj = {};
    if (sort === 'price-low') sortObj.price = 1;
    else if (sort === 'price-high') sortObj.price = -1;
    else if (sort === 'rating') sortObj.rating = -1;
    else if (sort === 'newest') sortObj.createdAt = -1;
    else sortObj.createdAt = -1; // default sort
    
    // Execute query
    const products = await Product.find(filter).sort(sortObj);
    
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch products',
      error: error.message 
    });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product || !product.isActive) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch product',
      error: error.message 
    });
  }
};

// @desc    Get single product by slug
// @route   GET /api/products/slug/:slug
// @access  Public
export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ 
      slug: req.params.slug, 
      isActive: true 
    });
    
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch product',
      error: error.message 
    });
  }
};

// @desc    Get products by category
// @route   GET /api/products/category/:category
// @access  Public
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ 
      category: new RegExp(category, 'i'),
      isActive: true 
    }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch products by category',
      error: error.message 
    });
  }
};

// @desc    Get products by type (food/toy)
// @route   GET /api/products/type/:type
// @access  Public
export const getProductsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const products = await Product.find({ 
      type: type.toLowerCase(),
      isActive: true 
    }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products by type:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch products by type',
      error: error.message 
    });
  }
};

// @desc    Search products
// @route   GET /api/products/search?q=searchterm
// @access  Public
export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ 
        success: false,
        message: 'Search query is required' 
      });
    }
    
    // Create text search query
    const searchRegex = new RegExp(q, 'i');
    
    const products = await Product.find({
      $and: [
        { isActive: true },
        {
          $or: [
            { title: searchRegex },
            { description: searchRegex },
            { brand: searchRegex },
            { category: searchRegex },
            { benefits: { $elemMatch: { $regex: searchRegex } } }
          ]
        }
      ]
    }).sort({ rating: -1, sold: -1 });
    
    res.json({
      success: true,
      count: products.length,
      searchTerm: q,
      data: products
    });
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ 
      success: false,
      message: 'Search failed',
      error: error.message 
    });
  }
};

// @desc    Get featured products (highly rated, popular)
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find({ 
      isActive: true,
      rating: { $gte: 4.0 }, // Products with rating 4.0 or higher
      sold: { $gte: 100 } // Products with at least 100 sales
    })
    .sort({ rating: -1, sold: -1 })
    .limit(8); // Limit to 8 featured products
    
    res.json({
      success: true,
      count: featuredProducts.length,
      data: featuredProducts
    });
  } catch (error) {
    console.error('Error fetching featured products:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch featured products',
      error: error.message 
    });
  }
};

// @desc    Create new product (DISABLED for now)
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Product creation feature is currently disabled'
  });
};

// @desc    Update product (DISABLED for now)
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Product update feature is currently disabled'
  });
};

// @desc    Delete product (DISABLED for now)
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Product deletion feature is currently disabled'
  });
};