const express = require('express');
const axios = require('axios');
const router = express.Router();

// Function to fetch a new theme of colors from Colormind API
const getColorTheme = async () => {
  try {
    const response = await axios.post('http://colormind.io/api/', {
      model: 'default',
    });

    const colorTheme = response.data.result;
    return colorTheme;
  } catch (error) {
    console.error('Error fetching color theme:', error.message);
    throw new Error('Error fetching color theme from Colormind.');
  }
};

// Function to fetch color data from Color Serial API
const getColorData = async (color) => {
    try {
      const response = await axios.get(`https://color.serialif.com/${encodeURIComponent(color)}`);
  
      const { base, complementary, grayscale } = response.data;
      return { base, complementary, grayscale };
    } catch (error) {
      console.error('Error fetching color data:', error.message);
      throw new Error('Error fetching color data from Color Serial API.');
    }
  };

// Route to retrieve a new color theme from Colormind API
router.get('/theme', async (req, res) => {
  try {
    const theme = await getColorTheme();
    res.send({ theme });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Route to retrieve base, complementary, and grayscale colors from Color Serial API
router.get('/complementary', async (req, res) => {
    const color = req.query.color;
  
    if (!color) {
      return res.status(400).send('Please specify a color name or RGB color code as a query parameter.');
    }
  
    try {
      const colorData = await getColorData(color);
      res.send({ colorData });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

module.exports = router;
