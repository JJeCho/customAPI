const express = require('express');
const axios = require('axios');
const router = express.Router();

// Helper function to form time ranges
const range = (start, stop, step) =>
	Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

router.get('/marine', async (req, res) => {
    const { lat, lon } = req.query;
  
    if (!lat || !lon) {
      return res.status(400).send('Please provide latitude and longitude.');
    }
  
    try {
      const response = await axios.get('https://marine-api.open-meteo.com/v1/marine', {
        params: {
          latitude: lat,
          longitude: lon,
          hourly: "wave_height",
        },
      });
      
      res.json(response.data);
    } catch (error) {
      res.status(500).send('Error fetching marine forecast data.');
    }
  });

  
  router.get('/air-quality', async (req, res) => {
    const { lat, lon } = req.query;
  
    if (!lat || !lon) {
      return res.status(400).send('Please provide latitude and longitude.');
    }
  
    try {
      const response = await axios.get('https://air-quality-api.open-meteo.com/v1/air-quality', {
        params: {
          latitude: lat,
          longitude: lon,
          hourly: ["pm10", "pm2_5"]
        },
      });
      res.json(response.data);
    } catch (error) {
      res.status(500).send('Error fetching air quality data.');
    }
  });

  router.get('/geocode', async (req, res) => {
    const { name } = req.query;
    console.log(name)
if (!name) {
  return res.status(400).send('Please provide a location query.');
}

try {
  const response = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
    params: { name: name },
  });
  res.json(response.data.results);
} catch (error) {
  res.status(500).send('Error fetching geocoding data.');
}
  });

  router.get('/elevation', async (req, res) => {
    const { lat, lon } = req.query;
  
    if (!lat || !lon) {
      return res.status(400).send('Please provide latitude and longitude.');
    }
  
    try {
      const response = await axios.get('https://api.open-meteo.com/v1/elevation', {
        params: {
          latitude: lat,
          longitude: lon,
        },
      });
      res.json(response.data);
    } catch (error) {
      res.status(500).send('Error fetching elevation data.');
    }
  });

  router.get('/flood', async (req, res) => {
    const { lat, lon } = req.query;
  
    if (!lat || !lon) {
      return res.status(400).send('Please provide latitude and longitude.');
    }
  
    try {
      const response = await axios.get('https://flood-api.open-meteo.com/v1/flood', {
        params: {
          latitude: lat,
          longitude: lon,
          daily: "river_discharge"

        },
      });
      res.json(response.data);
    } catch (error) {
      res.status(500).send('Error fetching flood data.');
    }
  });

  module.exports = router