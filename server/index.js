const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

// JSON 解析
app.use(express.json());

// Import routes
const languageRoutes = require('./routes/languages');
const migrantRoutes  = require('./routes/migrants');
const diseaseRoutes  = require('./routes/disease');
const mapRoutes      = require('./routes/maplocations');
const geminiRouter   = require('./routes/gemini');
const shareRouter    = require('./routes/share');
const forecastRouter = require('./routes/forecast');

// CORS allowlist
const whitelist = [
  'http://localhost:5173',
  'https://newcomerau.me'
];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) callback(null, true);
    else callback(new Error('Not allowed by CORS'));
  },
  credentials: true
};
app.use(cors(corsOptions));

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount API routes under /api
app.use('/api', languageRoutes);
app.use('/api', migrantRoutes);
app.use('/api', diseaseRoutes);
app.use('/api', mapRoutes);
app.use('/api/gemini', geminiRouter);

// shareRouter handles routes like GET /api/hfce-share
app.use('/api', shareRouter);
// forecastRouter handles GET /api/forecast-health-share
app.use('/api', forecastRouter);

// Error handler must have 4 args to be recognized by Express
app.use((err, req, res,) => {
  console.error(err.stack);
  res.status(500).json({ error: 'error' });
});
// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
