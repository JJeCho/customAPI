const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/check-language', async (req, res) => {
  const { text } = req.body;
    console.log(text);
  if (!text) {
    return res.status(400).send('Please provide text to check.');
  }

  try {
    const response = await axios.get('https://www.purgomalum.com/service/containsprofanity', {
      params: { text },
    });

    res.json({ containsProfanity: response.data });
  } catch (error) {
    console.error('Error checking language:', error.message);
    res.status(500).send('Error checking language.');
  }
});

module.exports = router;
