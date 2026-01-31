const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { body, validationResult } = require('express-validator');

// Get all products
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      search, 
      minPrice, 
      maxPrice, 
      sortBy = 'createdAt', 
      sortOrder = 'desc',
      page = 1,
      limit = 12,
      isHot,
      isFeatured
    } = req.query;

    // Build filter object
    const filter = { isAvailable: true };
    
    if (category) filter.category = category;
    if (isHot === 'true') filter.isHot = true;
    if (isFeatured === 'true') filter.isFeatured = true;
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    // Build search query
    if (search) {
      filter.$text = { $search: search };
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    const total = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / parseInt(limit));

    res.json({
      success: true,
      data: products,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalProducts: total,
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching products',
      error: error.message 
    });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
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
    console.error('Error fetching product:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching product',
      error: error.message 
    });
  }
});

// Get products by category
router.get('/category/:category', async (req, res) => {
  try {
    const products = await Product.getByCategory(req.params.category);
    
    res.json({
      success: true,
      data: products,
      category: req.params.category
    });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching products by category',
      error: error.message 
    });
  }
});

// Get hot deals
router.get('/deals/hot', async (req, res) => {
  try {
    const hotDeals = await Product.getHotDeals();
    
    res.json({
      success: true,
      data: hotDeals
    });
  } catch (error) {
    console.error('Error fetching hot deals:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching hot deals',
      error: error.message 
    });
  }
});

// Get featured products
router.get('/featured', async (req, res) => {
  try {
    const featuredProducts = await Product.getFeatured();
    
    res.json({
      success: true,
      data: featuredProducts
    });
  } catch (error) {
    console.error('Error fetching featured products:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching featured products',
      error: error.message 
    });
  }
});

// Search products
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const { page = 1, limit = 12 } = req.query;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const products = await Product.find({
      $text: { $search: query },
      isAvailable: true
    })
    .sort({ score: { $meta: 'textScore' } })
    .skip(skip)
    .limit(parseInt(limit))
    .select('-__v');

    const total = await Product.countDocuments({
      $text: { $search: query },
      isAvailable: true
    });
    
    const totalPages = Math.ceil(total / parseInt(limit));

    res.json({
      success: true,
      data: products,
      query,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalResults: total,
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error searching products',
      error: error.message 
    });
  }
});

// Create new product (Admin only)
router.post('/', [
  body('name').notEmpty().withMessage('Product name is required'),
  body('description').notEmpty().withMessage('Product description is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('originalPrice').isFloat({ min: 0 }).withMessage('Original price must be a positive number'),
  body('category').isIn(['Dairy', 'Ghee', 'Oil', 'Bundle', 'Combo', 'Pack', 'Trio', 'Family']).withMessage('Invalid category'),
  body('image').notEmpty().withMessage('Product image is required'),
  body('weight').notEmpty().withMessage('Product weight is required'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error',
        errors: errors.array() 
      });
    }

    const product = new Product(req.body);
    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating product',
      error: error.message 
    });
  }
});

// Update product (Admin only)
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating product',
      error: error.message 
    });
  }
});

// Delete product (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting product',
      error: error.message 
    });
  }
});

// Update product stock
router.patch('/:id/stock', async (req, res) => {
  try {
    const { quantity } = req.body;
    
    if (typeof quantity !== 'number') {
      return res.status(400).json({ 
        success: false, 
        message: 'Quantity must be a number' 
      });
    }

    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    await product.updateStock(quantity);

    res.json({
      success: true,
      message: 'Stock updated successfully',
      data: { stock: product.stock }
    });
  } catch (error) {
    console.error('Error updating stock:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating stock',
      error: error.message 
    });
  }
});

module.exports = router; 