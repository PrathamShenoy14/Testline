// routes/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');

const jwtSecret = process.env.JWT_SECRET;

// Register Route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Create new user
    user = new User({ username, email, password });
    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Return JWT
    const payload = { userId: user._id };
    jwt.sign(payload, jwtSecret, { expiresIn: '3h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: { username: user.username, email: user.email, score: user.score } });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    // Return JWT
    const payload = { userId: user._id };
    jwt.sign(payload, jwtSecret, { expiresIn: '3h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: { username: user.username, email: user.email, score: user.score } });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
