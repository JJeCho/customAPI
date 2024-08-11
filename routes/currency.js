const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/latest", async (req, res) => {
  const base = req.query.base || "USD";
  try {
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGERATE_API_KEY}/latest/${base}`
    );
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching latest exchange rates:", error.message);
    res.status(500).send("Error fetching latest exchange rates.");
  }
});

router.get("/convert", async (req, res) => {
  const { from, to, amount } = req.query;

  if (!from || !to || !amount) {
    return res
      .status(400)
      .send('Please specify "from", "to", and "amount" query parameters.');
  }

  try {
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGERATE_API_KEY}/pair/${from}/${to}/${amount}`
    );
    res.send(response.data);
  } catch (error) {
    console.error("Error converting currency:", error.message);
    res.status(500).send("Error converting currency.");
  }
});

router.get("/currencies", async (req, res) => {
  try {
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGERATE_API_KEY}/codes`
    );
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching supported currencies:", error.message);
    res.status(500).send("Error fetching supported currencies.");
  }
});

router.get("/historical", async (req, res) => {
  const { date, currency } = req.query;

  if (!date || !currency) {
    return res
      .status(400)
      .send(
        'Please specify both "date" (YYYY-MM-DD) and "currency" (e.g., eur) query parameters.'
      );
  }

  try {
    /**
     * TODO - Add validation for date format
     * Change the date format from X to YYYY-MM-DD
     * const formattedDate = date.replace(/-/g, "");
     *  */
    const response = await axios.get(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${currency}.json`
    );
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching historical exchange rates:", error.message);
    res.status(500).send("Error fetching historical exchange rates.");
  }
});

module.exports = router;
