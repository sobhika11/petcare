const express=require('express');
const app=express();
app.use(express.json());
const cors=require('cors');
app.use(cors());
app.get('/', (req, res) => {
  res.send('🎉 PetCare backend is up and running!');
});

// Simple booking endpoint for appointment form submissions
app.post('/api/book', (req, res) => {
  console.log('Received booking:', req.body);
  res.status(200).json({ message: 'Booking received' });
});

require('./db');
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
