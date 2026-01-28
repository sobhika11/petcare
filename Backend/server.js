const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Paths
const distPath = path.join(__dirname, '..', 'frontend', 'dist');
const imagesPath = path.join(__dirname, '..', 'frontend', 'public', 'Images');

// Serve frontend build
app.use(express.static(distPath));

// Serve images from public/Images at /Images
app.use('/Images', express.static(imagesPath));

// Minimal API route for testing
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// React Router fallback (serve index.html for non-API routes)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// DB connection
// require('./db');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
