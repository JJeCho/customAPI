const express = require("express");
const axios = require("axios");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

router.get('/:year/:countryCode', async (req, res) => {
    const { year, countryCode } = req.params;
    try {
        const response = await axios.get(`https://date.nager.at/Api/v3/PublicHoliday/${year}/${countryCode}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/check/:countryCode/:date', async (req, res) => {
    const { countryCode, date } = req.params;
    try {
        const response = await axios.get(`https://date.nager.at/Api/v3/PublicHoliday/${date}/${countryCode}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/next/:countryCode', async (req, res) => {
    const { countryCode } = req.params;
    try {
        const response = await axios.get(`https://date.nager.at/api/v3/NextPublicHolidays/${countryCode}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/countries', async (req, res) => {
    try {
        const response = await axios.get('https://date.nager.at/Api/v3/AvailableCountries');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/worldwide', async (req, res) => {
    try {
        const response = await axios.get('https://date.nager.at/Api/v3/NextPublicHolidaysWorldwide');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/longweekends/:year/:countryCode', async (req, res) => {
    const { year, countryCode } = req.params;
    try {
        const response = await axios.get(`https://date.nager.at/Api/v3/LongWeekend/${year}/${countryCode}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;
