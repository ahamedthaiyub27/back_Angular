const MenuItem = require('../Models/MenuItems');

// Get all menu items
exports.getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getAllMenuItemsbyId = async (req, res) => {
  try {
    const id = req.params.id;
    const menuItems = await MenuItem.findById(id);
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a menu item
exports.createMenuItem = async (req, res) => {
  const { name, description, price, category, image } = req.body;
  
  try {
    const menuItem = new MenuItem({
      name,
      description,
      price,
      category,
      image
    });
    
    const newMenuItem = await menuItem.save();
    res.status(201).json(newMenuItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a menu item
exports.updateMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });
    
    Object.assign(menuItem, req.body);
    const updatedMenuItem = await menuItem.save();
    res.json(updatedMenuItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};