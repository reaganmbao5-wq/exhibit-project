// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

// middleware
app.use(cors());
app.use(express.json()); // allows reading JSON in POST/PUT requests

const PORT = process.env.PORT || 3000;

// Simple welcome route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Museum Exhibits API' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
// --- CRUD ROUTES FOR EXHIBITS ---

// 1. GET all exhibits
app.get('/api/exhibits', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM exhibits ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET one exhibit by ID
app.get('/api/exhibits/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM exhibits WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Exhibit not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. POST - create a new exhibit
app.post('/api/exhibits', async (req, res) => {
  const { exhibit_title, description, origin, era, year_discovered, on_display } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO exhibits (exhibit_title, description, origin, era, year_discovered, on_display)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [exhibit_title, description, origin, era, year_discovered, on_display]
    );
    res.status(201).json({ id: result.insertId, message: 'Exhibit added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. PUT - update an exhibit
app.put('/api/exhibits/:id', async (req, res) => {
  const { exhibit_title, description, origin, era, year_discovered, on_display } = req.body;
  try {
    const [result] = await pool.query(
      `UPDATE exhibits
       SET exhibit_title=?, description=?, origin=?, era=?, year_discovered=?, on_display=?
       WHERE id=?`,
      [exhibit_title, description, origin, era, year_discovered, on_display, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Exhibit not found' });
    res.json({ message: 'Exhibit updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. DELETE - delete an exhibit
app.delete('/api/exhibits/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM exhibits WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Exhibit not found' });
    res.json({ message: 'Exhibit deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});