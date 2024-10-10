require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const reportRoutes = require('./routes/reports');
const receiptRoutes = require('./routes/receipts');
const multer = require('multer');
const path = require('path');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/receipts', receiptRoutes);

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/receiptsGPT';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.use((req, _, next) => {
  console.log('Request Body:', req.body);
  next();
});


// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Receipts GPT API' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Ensure correct routes are used
app.use('/api/users', userRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/receipts', receiptRoutes);