// server.js (index.js)
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const cron = require('node-cron');
const axios = require('axios');
require('dotenv').config();

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// ==========================
// Cron Job to Keep Server Alive
// ==========================
cron.schedule('*/10 * * * *', async () => {
    try {
        const url = `https://cage-api.onrender.com`; // Replace with your actual Render URL
        const response = await axios.get(url);
        console.log(`Ping successful: ${response.status} - Server is alive.`);
    } catch (error) {
        console.error('Ping failed:', error.message);
    }
});
