require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { dbconnect } = require('./config/Dbconfig');


const app = express();

// Connect to database
dbconnect

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/tables', require('./Routes/tableRoutes'));
app.use('/api/orders', require('./Routes/orderRoutes'));
app.use('/api/menu', require('./Routes/menuRoutes'));
app.use('/api/analytics', require('./Routes/analyticsRoutes'));
app.use('/api/auth', require('./Routes/authroutes'));
// app.use('/api/public', require('./routes/publicRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});