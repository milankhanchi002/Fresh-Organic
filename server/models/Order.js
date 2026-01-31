const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1']
  },
  image: {
    type: String,
    required: true
  },
  weight: {
    type: String,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderItems: [orderItemSchema],
  shippingAddress: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['cod', 'online', 'card', 'upi']
  },
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  paidAt: {
    type: Date
  },
  isDelivered: {
    type: Boolean,
    default: false
  },
  deliveredAt: {
    type: Date
  },
  deliveryDate: {
    type: Date,
    required: true
  },
  deliveryTime: {
    type: String,
    enum: ['morning', 'afternoon', 'evening'],
    default: 'morning'
  },
  deliveryInstructions: {
    type: String,
    maxlength: [200, 'Delivery instructions cannot exceed 200 characters']
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  trackingNumber: {
    type: String
  },
  estimatedDelivery: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for better query performance
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ status: 1 });
orderSchema.index({ 'orderItems.product': 1 });

// Virtual for order summary
orderSchema.virtual('orderSummary').get(function() {
  return {
    orderId: this._id,
    totalItems: this.orderItems.length,
    totalQuantity: this.orderItems.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: this.totalPrice,
    status: this.status
  };
});

// Method to calculate totals
orderSchema.methods.calculateTotals = function() {
  this.itemsPrice = this.orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  this.taxPrice = this.itemsPrice * 0.05; // 5% tax
  this.shippingPrice = this.itemsPrice > 500 ? 0 : 50; // Free shipping above ₹500
  this.totalPrice = this.itemsPrice + this.taxPrice + this.shippingPrice;
  return this;
};

// Method to update order status
orderSchema.methods.updateStatus = function(newStatus) {
  this.status = newStatus;
  
  if (newStatus === 'delivered') {
    this.isDelivered = true;
    this.deliveredAt = new Date();
  }
  
  if (newStatus === 'paid') {
    this.isPaid = true;
    this.paidAt = new Date();
  }
  
  return this.save();
};

// Method to mark as paid
orderSchema.methods.markAsPaid = function(paymentResult) {
  this.isPaid = true;
  this.paidAt = new Date();
  this.paymentResult = paymentResult;
  return this.save();
};

// Method to mark as delivered
orderSchema.methods.markAsDelivered = function() {
  this.isDelivered = true;
  this.deliveredAt = new Date();
  this.status = 'delivered';
  return this.save();
};

// Static method to get orders by user
orderSchema.statics.getByUser = function(userId) {
  return this.find({ user: userId }).populate('orderItems.product').sort({ createdAt: -1 });
};

// Static method to get orders by status
orderSchema.statics.getByStatus = function(status) {
  return this.find({ status }).populate('user', 'name email').sort({ createdAt: -1 });
};

// Static method to get pending orders
orderSchema.statics.getPending = function() {
  return this.find({ status: 'pending' }).populate('user', 'name email phone');
};

// Static method to get today's orders
orderSchema.statics.getTodaysOrders = function() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  return this.find({
    createdAt: {
      $gte: today,
      $lt: tomorrow
    }
  }).populate('user', 'name email');
};

// Ensure virtual fields are serialized
orderSchema.set('toJSON', { virtuals: true });
orderSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Order', orderSchema); 