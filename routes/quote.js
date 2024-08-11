const express = require('express');
const axios = require('axios');
const router = express.Router();
const cheerio = require('cheerio');

  const getQuoteOfTheDay = async () => {
    try {
      const response = await axios.get('https://en.wikiquote.org/w/api.php', {
        params: {
          format: 'json',
          action: 'parse',
          page: 'Template:QoD',
          prop: 'text',
        },
      });
  
      const htmlContent = response.data.parse.text['*'];
      const $ = cheerio.load(htmlContent);
  
      // Extract the quote
      const quote = $('td').eq(2).find('td').first().text().trim();
  
      // Extract the author
      let author = $('td').eq(2).find('td').last().text().trim();
      author = author.replace(/^~\s*|\s*~$/g, ''); 

      return { quote, author };
    } catch (error) {
      console.error('Error fetching Quote of the Day:', error.message);
      throw new Error('Error fetching Quote of the Day from Wikiquote.');
    }
  };
 


// Quote of the Day
router.get('/', async (req, res) => {
  try {
    const quoteOfTheDay = await getQuoteOfTheDay();
    res.send(quoteOfTheDay);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Fetch Random Quote
const getRandomQuote = async () => {
  try {
    const response = await axios.get('https://api.quotable.io/random');
    const data = response.data;
    const quote = `${data.content} - ${data.author}`;
    return { quote, author: data.author };
  } catch (error) {
    console.error('Error fetching Random Quote:', error.message);
    throw new Error('Error fetching Random Quote from Quotable.');
  }
};

// Random Quote Route
router.get('/random', async (req, res) => {
  try {
    const randomQuote = await getRandomQuote();
    res.send(randomQuote);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;


