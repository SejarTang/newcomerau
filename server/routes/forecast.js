const express = require('express');
const router = express.Router();
const pool = require('../db');
const { spawn } = require('child_process');
const path = require('path');

router.get('/forecast-health-share', async (req, res) => {
  const horizon = req.query.horizon_months || '12';
  try {
    // 1. 从数据库拿历史 ds, share
    const { rows } = await pool.query(
      'SELECT ds, share FROM hfce_share ORDER BY ds'
    );

    // 2. 调用 Python 脚本，并把 rows JSON 通过 stdin 传入
    const scriptPath = path.join(__dirname, '../forecast_service.py');
    const py = spawn('python', [scriptPath, horizon]);

    let stdout = '', stderr = '';
    py.stdin.write(JSON.stringify(rows));
    py.stdin.end();

    py.stdout.on('data', chunk => stdout += chunk);
    py.stderr.on('data', chunk => stderr += chunk.toString());

    py.on('close', code => {
      if (code !== 0) {
        console.error('Forecast script error:', stderr);
        return res.status(500).json({ error: 'Forecast script failed', detail: stderr.trim() });
      }
      try {
        const result = JSON.parse(stdout);
        res.json(result);
      } catch (e) {
        console.error('Invalid JSON from forecast script:', e, stdout);
        res.status(500).json({ error: 'Invalid JSON format' });
      }
    });
  } catch (err) {
    console.error('Forecast API Error:', err);
    res.status(500).json({ error: 'Database query failed', detail: err.message });
  }
});

module.exports = router;
