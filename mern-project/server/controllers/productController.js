import mongoose from 'mongoose';
import Product from '../models/productsModel.js';

export const getAllProducts = async (req, res) => {
  try {
    const { category, type, brand, minPrice, maxPrice, sort } = req.query;
    
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

    let sortObj = {};
    if (sort === 'price-low') sortObj.price = 1;
    else if (sort === 'price-high') sortObj.price = -1;
    else if (sort === 'rating') sortObj.rating = -1;
    else if (sort === 'newest') sortObj.createdAt = -1;
    else sortObj.createdAt = -1;

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


export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    let product;
    
    if (mongoose.Types.ObjectId.isValid(id) && id.length === 24) {
      
      product = await Product.findById(id);
    } else {
      
      product = await Product.findOne({ 
        slug: id, 
        isActive: true 
      });
    }
    
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
    console.error('Error fetching product by ID/slug:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch product',
      error: error.message 
    });
  }
};

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

export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ 
        success: false,
        message: 'Search query is required' 
      });
    }
    
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

export const getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find({ 
      isActive: true,
      rating: { $gte: 4.0 },
      sold: { $gte: 100 }
    })
    .sort({ rating: -1, sold: -1 })
    .limit(8); 
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

export const createProduct = async (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Product creation feature is currently disabled'
  });
};


export const updateProduct = async (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Product update feature is currently disabled'
  });
};

export const deleteProduct = async (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Product deletion feature is currently disabled'
  });
};