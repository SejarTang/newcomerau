const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/migrants', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM migrants');
    res.json(result.rows);
  } catch (err) {
    console.error('Migrants API Error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;