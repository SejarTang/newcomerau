const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

// 🔒 Input sanitisation helper
function sanitiseInput(input) {
  return input
    .replace(/[<>&"'`]/g, '') // Basic character sanitisation
    .trim()
    .substring(0, 500);        // Limit length
}

router.post('/', async (req, res) => {
  try {
    // Extract and sanitise input text
    const rawText = req.body?.contents?.[0]?.parts?.[0]?.text || '';
    const userText = sanitiseInput(rawText);

    // Reject if input is missing or too short
    if (!userText || userText.length < 3) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    // Rebuild the request body with sanitised input
    const safeBody = {
      contents: [
        {
          parts: [{ text: userText }]
        }
      ]
    };

    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      safeBody,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': process.env.GEMINI_API_KEY
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Gemini Proxy Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
