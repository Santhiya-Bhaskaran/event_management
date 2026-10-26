// // server.js
// const express = require('express');
// const mysql = require('mysql2');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const eventRoutes = require('./routes/eventRoute');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Connect to MySQL
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Santhiya@1',
//   database: 'event_management_app'
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//   } else {
//     console.log('Connected to MySQL');
//   }
// });

// // Register endpoint
// app.post('/register', (req, res) => {
//   const { username, password, phoneNo, email, address } = req.body;

//   db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
//     if (err) {
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//     if (results.length > 0) {
//       return res.status(400).json({ message: 'Username already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const query = 'INSERT INTO users (username, password, phoneNo, email, address) VALUES (?, ?, ?, ?, ?)';
//     db.query(query, [username, hashedPassword, phoneNo, email, address], (err, result) => {
//       if (err) {
//         return res.status(500).json({ message: 'Internal server error' });
//       }
//       res.status(201).json({ message: 'User registered successfully' });
//     });
//   });
// });

// // Login endpoint
// app.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
//     if (err) {
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//     if (results.length === 0) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const user = results[0];
//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     res.status(200).json({ user });
//   });
// });

// // Add event endpoint
// app.post('/api/events', (req, res) => {
//   const { title, date, reminder, userid } = req.body;

//   if (!title || !date || !userid) {
//     return res.status(400).json({ message: 'Missing required fields' });
//   }

//   const query = 'INSERT INTO events (title, date, reminder, userid) VALUES (?, ?, ?, ?)';
//   db.query(query, [title, date, reminder, userid], (err, result) => {
//     if (err) {
//       console.error('Error inserting event:', err);
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//     console.log("### New event added ###", { title, date, reminder, userid });
//     res.status(201).json({ message: 'Event added successfully', eventId: result.insertId });
//   });
// });

// // Routes for events (assuming eventRoutes has been updated for MySQL)
// app.use('/api/events', eventRoutes);

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
