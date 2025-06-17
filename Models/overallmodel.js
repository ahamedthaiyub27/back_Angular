const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true,
    unique: true,
  },
  ordered_food: {
    type: String,
    required: true
  },
  ordered_quantity: {
    type: Number,
    required: true
  },
  order_status: {
    type: String,
    enum: ["Processing", "Done", "Not Pickup", "Ready for pickup", "Cancelled"],
    default: "Processing"
  },
order_type: {
  type: String,
  enum: ['Dine in', 'Takeaway', 'Delivery', 'served'], 
  required: true
},
  no_of_persons: {
    type: Number,
    required: true
  },
  table_no: {
    type: Number,
    required: true
  },
  cooking_instructions:{
    type:String,

  },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  },
  chef_assigned: {
    type: Number,
    
  },
  ordered_amount:{
    type:Number,
    required:true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);
