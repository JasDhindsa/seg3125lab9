
import express from 'express';
import cors from 'cors';
import db from './database.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// tutors
app.get('/api/tutors', (req, res) => {
  db.all("SELECT * FROM tutors", [], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    });
  });
});

// bookings
app.get('/api/bookings', (req, res) => {
  db.all("SELECT * FROM bookings", [], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    });
  });
});

// create booking
app.post('/api/bookings', (req, res) => {
  const { tutorId, tutorName, tutorPhoto, subject, date, time } = req.body;
  const id = Date.now().toString(); 
  const query = `INSERT INTO bookings (id, tutorId, tutorName, tutorPhoto, subject, date, time, status) VALUES (?, ?, ?, ?, ?, ?, ?, 'upcoming')`;
  const params = [id, tutorId, tutorName, tutorPhoto, subject, date, time];

  db.run(query, params, function(err) {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": { id, ...req.body, status: 'upcoming' }
    });
  });
});

// update booking status
app.patch('/api/bookings/:id', (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  const query = `UPDATE bookings SET status = ? WHERE id = ?`;
  
  db.run(query, [status, id], function(err) {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": { id, status }
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
