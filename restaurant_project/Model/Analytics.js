const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  totalRevenue: Number,
  tablesOccupied: Number,
  popularItems: [{
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem'
    },
    count: Number
  }],
  peakHours: [{
    hour: Number,
    orders: Number
  }]
});

module.exports = mongoose.model('Analytics', analyticsSchema);