const express = require('express');
const router = express.Router();
const menuController = require('../Controllers/Menucontroller');

// Get all menu items
router.get('/', menuController.getAllMenuItems);

// Create a new menu item
router.post('/', menuController.createMenuItem);
router.route('/:id').get(menuController.getAllMenuItemsbyId)

// Update a menu item
router.patch('update/:id', menuController.updateMenuItem);

module.exports = router;