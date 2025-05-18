const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const { spawn } = require('child_process');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3001;

const languageRoutes = require('./routes/languages');
const migrantRoutes = require('./routes/migrants');
const diseaseRoutes = require('./routes/disease');
const mapRoutes = require('./routes/maplocations');
const geminiRouter = require('./routes/gemini');

// Allowlist for CORS
const whitelist = [
  'http://localhost:5173',        // Local dev
  'https://newcomerau.me'         // Your deployed frontend
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log(' Incoming Origin:', origin);
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Dynamic forecast route
app.get('/api/forecast-health-share', (req, res) => {
  const horizon = req.query.horizon_months || '12';
  const script = path.join(__dirname, 'forecast_service.py');
  const py = spawn('python', [script, horizon]);

  let out = '', err = '';
  py.stdout.on('data', chunk => out += chunk);
  py.stderr.on('data', chunk => err += chunk.toString());

  py.on('close', code => {
    if (code !== 0) {
      console.error('Forecast script error:', err);
      return res.status(500).json({ error: 'Forecast failed' });
    }
    try {
      res.json(JSON.parse(out));
    } catch (e) {
      console.error('Invalid JSON from forecast script:', e, out);
      res.status(500).json({ error: 'Bad response format' });
    }
  });
});

// Existing routes
app.use('/api', languageRoutes);
app.use('/api', migrantRoutes);
app.use('/api', diseaseRoutes);
app.use('/api', mapRoutes);
app.use('/api/gemini', geminiRouter);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'error' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
