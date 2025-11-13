// backend/checkdb.js
const pool = require('./db');

(async () => {
  try {
    const [rows] = await pool.query('SELECT COUNT(*) AS total FROM exhibits');
    console.log('✅ Connection successful! Exhibits count:', rows[0].total);
    process.exit(0);
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  }
})();