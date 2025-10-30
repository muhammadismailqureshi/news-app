require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/newsapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// News API configuration
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_URL = 'https://newsapi.org/v2';

// Import routes
const authRoutes = require('./routes/auth');

// Use routes
app.use('/api/auth', authRoutes);

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Get top headlines
app.get('/api/news', async (req, res) => {
  try {
    const { country = 'us', category = '', pageSize = 10, page = 1 } = req.query;
    
    const response = await axios.get(`${NEWS_API_URL}/top-headlines`, {
      params: {
        country,
        category,
        pageSize,
        page,
        apiKey: NEWS_API_KEY
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Search news
app.get('/api/news/search', async (req, res) => {
  try {
    const { q, pageSize = 10, page = 1 } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    
    const response = await axios.get(`${NEWS_API_URL}/everything`, {
      params: {
        q,
        pageSize,
        page,
        sortBy: 'publishedAt',
        apiKey: NEWS_API_KEY
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error searching news:', error);
    res.status(500).json({ error: 'Failed to search news' });
  }
});

// Start server
if (process.env.NETLIFY_DEV !== 'true') {
  // For local development
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the Express app for serverless functions
module.exports = app;
