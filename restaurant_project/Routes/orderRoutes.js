const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/orderController')

// Create a new order
router.post('/', orderController.createOrder);

// Get all orders
router.get('/', orderController.getAllOrders);

// Update order status
router.patch('/:id/status', orderController.updateOrderStatus);

module.exports = router;