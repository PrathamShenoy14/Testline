const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios')

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173',  // Replace with your frontend URL
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}));
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose.connect(`${process.env.MONGO_URI}/quiz`)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Routes
app.use('/api/users', require('./routes/user.route.js'));
app.use('/api/leaderboard', require('./routes/leaderboard.route.js'));

app.get('/api/proxy', async (req, res) => {
  try {
    const response = await axios.get('https://api.jsonserve.com/Uw5CrX');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from API:', error);
    res.status(500).send({ message: 'Error fetching data' }); // Sending a JSON message instead of a string
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
