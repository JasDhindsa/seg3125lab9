
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, 'tutorconnect.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to the database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    initializeDatabase();
  }
});

function initializeDatabase() {
  db.serialize(() => {
    // tables
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS tutors (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      photo TEXT,
      bio TEXT,
      pricePerHour REAL,
      rating REAL,
      reviewCount INTEGER
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS subjects (
      id TEXT PRIMARY KEY,
      name TEXT UNIQUE NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS tutor_subjects (
      tutor_id TEXT,
      subject_id TEXT,
      PRIMARY KEY (tutor_id, subject_id),
      FOREIGN KEY (tutor_id) REFERENCES tutors(id),
      FOREIGN KEY (subject_id) REFERENCES subjects(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      tutorId TEXT NOT NULL,
      tutorName TEXT NOT NULL,
      tutorPhoto TEXT,
      subject TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      status TEXT DEFAULT 'upcoming',
      FOREIGN KEY (tutorId) REFERENCES tutors(id)
    )`);

    // seed if empty
    db.get("SELECT COUNT(*) as count FROM tutors", (err, row) => {
      if (row.count === 0) {
        seedData();
      }
    });
  });
}

function seedData() {
  const tutors = [
    { id: "1", name: "Dr. Sarah Johnson", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop", pricePerHour: 45, rating: 4.9, reviewCount: 127, bio: "PhD in Mathematics with 10+ years of teaching experience. Specialized in calculus, linear algebra, and statistics." },
    { id: "2", name: "Prof. Michael Chen", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", pricePerHour: 50, rating: 4.8, reviewCount: 98, bio: "Former university professor with expertise in quantum physics and programming." },
    { id: "3", name: "Emily Rodriguez", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop", pricePerHour: 40, rating: 4.9, reviewCount: 143, bio: "Biochemistry graduate with a passion for life sciences." }
  ];

  const stmt = db.prepare("INSERT INTO tutors (id, name, photo, pricePerHour, rating, reviewCount, bio) VALUES (?, ?, ?, ?, ?, ?, ?)");
  tutors.forEach(t => stmt.run(t.id, t.name, t.photo, t.pricePerHour, t.rating, t.reviewCount, t.bio));
  stmt.finalize();

  const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "Statistics"];
  const subStmt = db.prepare("INSERT INTO subjects (id, name) VALUES (?, ?)");
  subjects.forEach((s, i) => subStmt.run((i + 1).toString(), s));
  subStmt.finalize();

  // Add initial bookings
  const bookingStmt = db.prepare("INSERT INTO bookings (id, tutorId, tutorName, tutorPhoto, subject, date, time, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
  bookingStmt.run("s1", "1", "Dr. Sarah Johnson", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop", "Mathematics", "2026-03-12", "14:00", "upcoming");
  bookingStmt.finalize();
  
  console.log("Database seeded successfully.");
}

export default db;
