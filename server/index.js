const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const app = express();
app.use(express.json());
const port = 3001;

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
      callback(null, true);   // Allow request
    } else {
      callback(new Error('Not allowed by CORS'));  // Reject others
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', languageRoutes);
app.use('/api', migrantRoutes);
app.use('/api', diseaseRoutes);
app.use('/api', mapRoutes);
app.use('/api/gemini', geminiRouter);

// err handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'error' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
