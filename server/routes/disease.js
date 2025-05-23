const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/disease', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM common_disease');
    res.json(result.rows);
  } catch (err) {
    console.error('Disease API Error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;