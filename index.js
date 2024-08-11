// Import necessary modules
const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const quotes = require('./routes/quote')
const timeLog = require('./middlewares/timelog')
const colors = require('./routes/color')
const aiRoutes = require('./routes/ai')
const currency = require('./routes/currency')
const authorization = require('./routes/authorization')
const news = require('./routes/news')
const weather = require('./routes/weather')
const environment = require('./routes/environment')
const utils = require('./routes/utils')
const admin = require('./routes/admin');
const dotenv = require('dotenv');
dotenv.config();

// Initialize the Express app
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS for all routes
app.use(timeLog); // Use the timeLog middleware


// Define a basic route
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Router routes
app.use('/quotes', quotes);
app.use('/colors', colors);
app.use('/ai', aiRoutes);
app.use('/currency', currency);
app.use('/auth', authorization);
app.use('/news', news);
app.use('/weather', weather);
app.use('/environment', environment);
app.use('/utils', utils);
app.use('/admin', admin);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
