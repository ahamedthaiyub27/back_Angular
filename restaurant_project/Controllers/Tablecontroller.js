const Table = require('../Model/Table');

// Get all tables
exports.getAllTables = async (req, res) => {
  try {
    const tables = await Table.find().sort('tableNumber');
    res.json(tables);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a table
exports.createTable = async (req, res) => {
  const { tableNumber, capacity } = req.body;
  
  try {
    const table = new Table({
      tableNumber,
      capacity
    });
    
    const newTable = await table.save();
    res.status(201).json(newTable);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update table status
exports.updateTableStatus = async (req, res) => {
  const { status } = req.body;
  
  try {
    const table = await Table.findById(req.params.id);
    if (!table) return res.status(404).json({ message: 'Table not found' });
    
    table.status = status;
    const updatedTable = await table.save();
    res.json(updatedTable);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};