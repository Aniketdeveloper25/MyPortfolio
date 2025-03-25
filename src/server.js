// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Middleware to parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Import and use the contact routes
const contactRoutes = require('./routes/contact');
app.use('/forms', contactRoutes);
console.log('Contact routes mounted at /forms');

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  console.log(`404 Not Found: ${req.method} ${req.url}`);
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Views directory: ${path.join(__dirname, 'views')}`);
}); 