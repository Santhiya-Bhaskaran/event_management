// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/database');
const nodemailer = require('nodemailer');

// Get all events
router.get('/', (req, res) => {
  db.query('SELECT * FROM events', (err, results) => {
    if (err) return res.status(500).json({ message: 'Internal server error' });
    res.json(results);
  });
});

// Create a new event
router.post('/', (req, res) => {
  const { title, date, reminder, username } = req.body;
  console.log(username)
  const query = 'INSERT INTO events (title, date, reminder, userid) VALUES (?, ?, ?, ?)';
  db.query(query, [title, date, reminder, username], (err, result) => {
    if (err) return res.status(400).json({ err});

    // Send email notification
    sendEmail(username, title, date);
    res.status(201).json({ id: result.insertId, title, date, reminder, username });
  });
});

// Delete an event
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM events WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error deleting event' });
    res.json({ message: 'Event deleted' });
  });
});

// Update an event by ID
router.put('/:id', (req, res) => {
  const { title, date, reminder } = req.body;
  const query = 'UPDATE events SET title = ?, date = ?, reminder = ? WHERE id = ?';

  db.query(query, [title, date, reminder, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error updating event' });
    res.json({ message: 'Event updated successfully' });
  });
});

async function sendEmail(username, title, date) {
  const userQuery = 'SELECT email FROM users WHERE username = ?';
  db.query(userQuery, [username], (err, result) => {
    if (err || result.length === 0) return console.error('User not found');

    const email = result[0].email;
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'rethuu08@gmail.com',
        pass: 'ymlo elup uhqv aztu'
      }
    });

    const mailOptions = {
      from: 'rethuu08@gmail.com',
      to: email,
      cc: 'rethanya8124@gmail.com',
      subject: `Event Details Planned for - ${date}`,
      text: `Notification about your upcoming event:\n\nEvent Name: ${title}\nEvent Date: ${date}\n\nThanks,\nEvent Admin Team.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return console.error('Error sending email:', error);
      console.log('Email sent:', info.response);
    });
  });
}

module.exports = router;
