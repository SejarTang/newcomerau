const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

// JSON 解析
app.use(express.json());

// CORS 设置
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

// 静态资源目录
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Forecast 路由
const forecastRouter = require('./routes/forecast');
app.use('/api', forecastRouter);

// 其他现有路由
app.use('/api', require('./routes/languages'));
app.use('/api', require('./routes/migrants'));
app.use('/api', require('./routes/disease'));
app.use('/api', require('./routes/maplocations'));
app.use('/api/gemini', require('./routes/gemini'));

// 全局错误处理
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// 启动
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
