const express = require("express");
const axios = require("axios");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

const askGPT3 = async (prompt) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "gpt-3.5-turbo",
        prompt: prompt,
        max_tokens: 10,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error(
      "Error fetching GPT-3 response:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Error communicating with OpenAI API.");
  }
};

router.get("/ask-ai", async (req, res) => {
  const prompt = req.query.prompt;

  if (!prompt) {
    return res
      .status(400)
      .send("Please specify a prompt as a query parameter.");
  }

  try {
    const aiResponse = await askGPT3(prompt);
    res.send({ response: aiResponse });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
