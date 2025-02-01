// routes/leaderboard.js
const express = require('express');
const router = express.Router();
const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

// Middleware to verify JWT token
// Middleware to verify JWT token
const auth = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; // decoded contains { userId: ... }
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};


// Get Leaderboard (all users sorted by score descending)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ score: -1 }).select('username score');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update Score Route (requires authentication)
// Update Score Route (requires authentication)
router.post('/update', auth, async (req, res) => {
  const { score } = req.body;
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(400).json({ msg: 'User not found' });

    if (score > user.score) {
      user.score = score;
      await user.save();
    }

    res.json({ msg: 'Score updated successfully', score: user.score });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;
