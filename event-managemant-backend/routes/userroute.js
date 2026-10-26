// routes/userRoute.js
const express = require('express');
const router = express.Router();
const db = require('../config/database');
const bcrypt = require('bcrypt');

// Register new user
router.post('/register', async (req, res) => {
  const { username, password, phoneNo, email, address } = req.body;

  const userCheckQuery = 'SELECT * FROM users WHERE username = ?';
  db.query(userCheckQuery, [username], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Internal server error' });
    if (results.length > 0) return res.status(400).json({ message: 'Username already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const insertUserQuery = 'INSERT INTO users (username, password, phoneNo, email, address) VALUES (?, ?, ?, ?, ?)';
    db.query(insertUserQuery, [username, hashedPassword, phoneNo, email, address], (err, result) => {
      if (err) return res.status(500).json({ message: 'Internal server error' });
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

// User login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Internal server error' });
    if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ message: 'Invalid credentials' });

    res.status(200).json({ user });
  });
});

module.exports = router;
