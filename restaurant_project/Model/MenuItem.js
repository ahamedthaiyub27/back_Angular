const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['pizza', 'drinks', 'desserts', 'sides'],
    required: true
  },
  image: String
});

module.exports = mongoose.model('MenuItem', menuItemSchema);