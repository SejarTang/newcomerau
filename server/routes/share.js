// server/routes/hfce.js
const express = require('express');
const router  = express.Router();
const pool    = require('../db');
// GET /api/hfce-share
// returns the historical series from your “complete_hfce_share” table
router.get('/share', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        ds,
        share
      FROM complete_hfce_share
      ORDER BY ds
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('HFCE Share API Error:', err);
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
