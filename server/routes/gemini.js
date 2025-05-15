const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      req.body,
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
