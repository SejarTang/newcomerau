const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const languageRoutes = require('./routes/languages');
const migrantRoutes = require('./routes/migrants');
const diseaseRoutes = require('./routes/disease');
const ocrRoutes = require('./routes/ocr');
const mapRoutes = require('./routes/maplocations');

// Allowlist for CORS
const whitelist = [
  'http://localhost:5173',        // Local dev
  'https://newcomerau.me'         // Your deployed frontend
];

const corsOptions = {
  origin: function (origin, callback) {
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

// Routes
app.use('/api', languageRoutes);
app.use('/api', migrantRoutes);
app.use('/api', diseaseRoutes);
app.use('/api', ocrRoutes);
app.use('/api', mapRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
