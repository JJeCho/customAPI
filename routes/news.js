const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        apiKey: process.env.NEWS_API_KEY, // Store your API key in .env
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching top news:', error.message);
    res.status(500).send('Error fetching top news.');
  }
});

router.get('/search', async (req, res) => {
    const query = req.query.q;
  
    if (!query) {
      return res.status(400).send('Please provide a search query.');
    }
  
    try {
      const response = await axios.get('https://newsapi.org/v2/everything', {
        params: {
          q: query,
          apiKey: process.env.NEWS_API_KEY,
        },
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error.message);
      res.status(500).send('Error fetching search results.');
    }
  });

  router.get('/floridaman', async (req, res) => {
    try {
      const response = await axios.get('https://serpapi.com/search.json', {
        params: {
          q: 'florida man',
          tbm: 'nws', // news tab on Google
          api_key: process.env.SERPAPI_KEY, // Store your SerpAPI key in .env
        },
      });
      res.json(response.data.news_results);
    } catch (error) {
      console.error('Error fetching Florida Man news:', error.message);
      res.status(500).send('Error fetching Florida Man news.');
    }
  });
  
  module.exports = router;