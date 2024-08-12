const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res
      .status(400)
      .send(
        "Please provide latitude (lat) and longitude (lon) query parameters."
      );
  }

  try {
    const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
      params: {
        latitude: lat,
        longitude: lon,
        current_weather: true,
      },
    });

    res.json(response.data.current_weather);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    res.status(500).send("Error fetching weather data.");
  }
});

router.get("/historical", async (req, res) => {
  const { lat, lon, start, end } = req.query;

  if (!lat || !lon || !start || !end) {
    return res
      .status(400)
      .send("Please provide latitude, longitude, start date, and end date.");
  }

  try {
    const response = await axios.get(
      "https://archive-api.open-meteo.com/v1/archive",
      {
        params: {
          latitude: lat,
          longitude: lon,
          start_date: start,
          end_date: end,
          timezone: "auto",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching historical weather data.");
  }
});

/**
 * TODO - Validate Input
 * Eventually will allow front end client to select multiple models
 * https://open-meteo.com/en/docs
 * Make sure that the routes are capable of adding input to params
 *  - hourly, daily, models
 */

router.get("/ensemble", async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).send("Please provide latitude and longitude.");
  }

  try {
    const response = await axios.get(
      "https://ensemble-api.open-meteo.com/v1/ensemble",
      {
        params: {
          latitude: lat,
          longitude: lon,
          daily: ["temperature_2m_max", "temperature_2m_min"],
          timezone: "auto",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching ensemble model data.");
  }
});

router.get("/climate", async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).send("Please provide latitude and longitude.");
  }

  try {
    const response = await axios.get("https://climate-api.open-meteo.com/v1/climate", {
      params: {
        latitude: lat,
        longitude: lon,
        start_date: "1950-01-01",
        end_date: "2050-12-31",
        models: [
          "CMCC_CM2_VHR4",
          "FGOALS_f3_H",
          "HiRAM_SIT_HR",
          "MRI_AGCM3_2_S",
          "EC_Earth3P_HR",
          "MPI_ESM1_2_XR",
          "NICAM16_8S",
        ],
        daily: "temperature_2m_max",
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching climate change projection data.");
  }
});

module.exports = router;
