const express = require('express');
const db = require('../db'); // Import the promise-based pool from db.js
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const title = req.query.title;

    const query = title
      ? `SELECT * FROM fastfoods WHERE title LIKE ?`
      : `SELECT * FROM fastfoods`;

    const params = title ? [`%${title}%`] : [];
    const [results] = await db.query(query, params);

    res.json(results);


  } catch (err) {
    console.error('Error fetching fast food items:', err);
    res.status(500).json({ error: 'Error fetching fast food items' });
  }
});


module.exports = router;



/* code before pool is used
const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/fastfoods', (req, res) => {
  const title = req.query.title; // Get the title from the query parameters

  // If title is provided, search by title, otherwise fetch all fast food items
  const query = title
    ? `SELECT * FROM fastfoods WHERE title LIKE ?` // Search for items with similar title
    : `SELECT * FROM fastfoods`; // Fetch all items if no title is provided

  db.query(query, title ? [`%${title}%`] : [], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching fast food items' });
    }
    res.json(results);
  });
});

module.exports = router;
*/