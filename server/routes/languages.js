const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/languages', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM top_languages');
    res.json(result.rows);
  } catch (err) {
    console.error('Languages API Error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
