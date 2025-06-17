const express = require('express');
const router = express.Router();
const tableController = require('../Controllers/Tablecontroller');

// Get all tables
router.get('/', tableController.getAllTables);

// Create a new table
router.post('/', tableController.createTable);

// Update table status
router.patch('/:id/status', tableController.updateTableStatus);

module.exports = router;