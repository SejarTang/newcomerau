const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const languageRoutes = require('./routes/languages');
const migrantRoutes = require('./routes/migrants');

app.use(cors());
app.use('/api/languages', languageRoutes);
app.use('/api/migrants', migrantRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
