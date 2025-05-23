// server/routes/hfce.js
const express = require('express');
const router  = express.Router();
const pool    = require('../db');


// GET /api/hfce-forecast
// returns the 12-month forecast from your “forecast_results” table
router.get('/forecast', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        ds,
        yhat,
        yhat_lower,
        yhat_upper
      FROM forecast_results
      ORDER BY ds
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('HFCE Forecast API Error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
