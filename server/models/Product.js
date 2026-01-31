const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    required: [true, 'Original price is required'],
    min: [0, 'Original price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: ['Dairy', 'Ghee', 'Oil', 'Bundle', 'Combo', 'Pack', 'Trio', 'Family'],
    default: 'Dairy'
  },
  image: {
    type: String,
    required: [true, 'Product image is required']
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be negative'],
    max: [5, 'Rating cannot exceed 5']
  },
  numReviews: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  isHot: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  weight: {
    type: String,
    required: [true, 'Product weight is required']
  },
  expiryDate: {
    type: Date,
    required: [true, 'Expiry date is required']
  },
  nutritionalInfo: {
    calories: Number,
    protein: Number,
    fat: Number,
    carbohydrates: Number,
    fiber: Number
  },
  ingredients: [{
    type: String,
    trim: true
  }],
  allergens: [{
    type: String,
    trim: true
  }],
  certifications: [{
    type: String,
    trim: true
  }],
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Index for better search performance
productSchema.index({ name: 'text', description: 'text', category: 1 });
productSchema.index({ category: 1, isAvailable: 1 });
productSchema.index({ isHot: 1, isFeatured: 1 });

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

// Virtual for average rating
productSchema.virtual('averageRating').get(function() {
  return this.rating;
});

// Method to update stock
productSchema.methods.updateStock = function(quantity) {
  this.stock += quantity;
  if (this.stock < 0) {
    throw new Error('Stock cannot be negative');
  }
  return this.save();
};

// Method to check if product is in stock
productSchema.methods.isInStock = function() {
  return this.stock > 0 && this.isAvailable;
};

// Static method to get products by category
productSchema.statics.getByCategory = function(category) {
  return this.find({ category, isAvailable: true });
};

// Static method to get hot deals
productSchema.statics.getHotDeals = function() {
  return this.find({ isHot: true, isAvailable: true });
};

// Static method to get featured products
productSchema.statics.getFeatured = function() {
  return this.find({ isFeatured: true, isAvailable: true });
};

// Ensure virtual fields are serialized
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Product', productSchema); 