const Order = require('../Model/Order');
const MenuItem = require('../Model/MenuItem');
const Table = require('../Model/Table');


exports.createOrder = async (req, res) => {
  const { tableNumber, items } = req.body;
  
  try {
 
    let totalAmount = 0;
    const orderItems = [];
    
    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);
      if (!menuItem) {
        return res.status(404).json({ message: `Menu item ${item.menuItem} not found` });
      }
      
      totalAmount += menuItem.price * item.quantity;
      orderItems.push({
        menuItem: item.menuItem,
        quantity: item.quantity,
        price: menuItem.price
      });
    }
    
   
    const order = new Order({
      tableNumber,
      items: orderItems,
      totalAmount
    });
    
   
    await Table.findOneAndUpdate(
      { tableNumber },
      { status: 'occupied' },
      { new: true }
    );
    
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.menuItem');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    
    order.status = status;
    
    // If order is completed or cancelled, free up the table
    if (status === 'completed' || status === 'cancelled') {
      await Table.findOneAndUpdate(
        { tableNumber: order.tableNumber },
        { status: 'available' },
        { new: true }
      );
    }
    
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};