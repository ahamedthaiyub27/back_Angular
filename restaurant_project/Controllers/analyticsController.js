const Analytics = require('../Model/Analytics');
const Order = require('../Model/Order');
const MenuItem = require('../Model/MenuItem');

// Get analytics data
exports.getAnalytics = async (req, res) => {
  try {
    // Calculate daily revenue
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const orders = await Order.find({
      createdAt: { $gte: today },
      status: 'completed'
    });
    
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    
    // Get popular items
    const popularItems = await Order.aggregate([
      { $match: { status: 'completed', createdAt: { $gte: today } } },
      { $unwind: '$items' },
      { $group: { _id: '$items.menuItem', count: { $sum: '$items.quantity' } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    
    // Populate menu item details
    const populatedItems = await Promise.all(
      popularItems.map(async item => {
        const menuItem = await MenuItem.findById(item._id);
        return {
          menuItem,
          count: item.count
        };
      })
    );
    
    // Get peak hours (simplified example)
    const peakHours = await Order.aggregate([
      { $match: { status: 'completed', createdAt: { $gte: today } } },
      { $group: { 
          _id: { $hour: '$createdAt' },
          count: { $sum: 1 }
        } 
      },
      { $sort: { count: -1 } },
      { $limit: 3 }
    ]);
    
    // Create analytics record
    const analytics = new Analytics({
      totalRevenue,
      tablesOccupied: orders.length,
      popularItems: populatedItems,
      peakHours: peakHours.map(hour => ({
        hour: hour._id,
        orders: hour.count
      }))
    });
    
    await analytics.save();
    
    res.json(analytics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};