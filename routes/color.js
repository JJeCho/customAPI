const express = require('express');
const axios = require('axios');
const router = express.Router();

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

router.get('/theme', async (req, res) => {
  try {
    const theme = await getColorTheme();
    res.send({ theme });
  } catch (error) {
    res.status(500).send(error.message);
  }
});


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
// Route to get a random color
router.get('/random', async (req, res) => {
  try {
      const response = await axios.get('https://x-colors.yurace.pro/api/random');
      res.json(response.data);
  } catch (error) {
      console.error('Error fetching random color:', error.message);
      res.status(500).json({ error: 'Failed to fetch random color' });
  }
});

// Route to get a random color of a given hue
router.get('/random/:hue', async (req, res) => {
  const { hue } = req.params;
  try {
      const response = await axios.get(`https://x-colors.yurace.pro/api/random/${hue}`);
      res.json(response.data);
  } catch (error) {
      console.error(`Error fetching random color with hue (${hue}):`, error.message);
      res.status(500).json({ error: `Failed to fetch random color with hue ${hue}` });
  }
});

router.get('/convert', async (req, res) => {
  const { from, to, value } = req.query;

  if (!from || !to || !value) {
      return res.status(400).json({ error: 'Missing required parameters: from, to, and value are required' });
  }
  let formattedValue;
    if (from.toLowerCase() === 'rgb') {
        formattedValue = extractRGBValues(value);
    } else if (from.toLowerCase() === 'hsl') {
        formattedValue = extractHSLValues(value);
    } else {
        formattedValue = value;
    }
  
  const endpoint = `https://x-colors.yurace.pro/api/${from}2${to}?value=${formattedValue}`;

  try {
      const response = await axios.get(endpoint);
      res.json(response.data);
  } catch (error) {
      console.error(`Error converting color from ${from} to ${to} with value ${formattedValue}:`, error.message);
      res.status(500).json({ error: `Failed to convert color from ${from} to ${to} with value ${value}` });
  }
});

function extractRGBValues(input) {
  let rgbValues;

  // Check if the input is in the form of rgb(x, y, z)
  if (input.startsWith('rgb')) {
      rgbValues = input.match(/\d+/g);
  } 
  // Check if the input is separated by commas (e.g., 255,255,255)
  else if (input.includes(',')) {
      rgbValues = input.split(',').map(value => value.trim());
  } 
  // If the input is separated by dashes (e.g., 255-255-255)
  else if (input.includes('-')) {
      rgbValues = input.split('-').map(value => value.trim());
  } 
  // If the input is already in the correct format, just return it
  else {
      return input;
  }

  // Join the extracted values with dashes
  return rgbValues.join('-');
}

function extractHSLValues(input) {
  let hslValues;

  // Check if the input is in the form of hsl(x, y%, z%)
  if (input.startsWith('hsl')) {
      hslValues = input.match(/\d+%?/g);
  } 
  // Check if the input is separated by commas (e.g., 360,100%,50%)
  else if (input.includes(',')) {
      hslValues = input.split(',').map(value => value.trim());
  } 
  // If the input is separated by dashes (e.g., 360-100%-50%)
  else if (input.includes('-')) {
      hslValues = input.split('-').map(value => value.trim());
  } 
  // If the input is already in the correct format, just return it
  else {
      return input;
  }

  // Join the extracted values with dashes
  return hslValues.join('-');
}

module.exports = router;
