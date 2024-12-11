const express = require('express');
const db = require('../db');
const router = express.Router();

// Search Page (GET request to show the search form)
router.get('/', (req, res) => {
  res.render('search', { results: [] });
});

// Search Fast Foods (POST request to handle search)
router.post('/', (req, res) => {
  const searchQuery = `%${req.body.query}%`; // Use the search term entered by the user
  db.query(
    'SELECT * FROM fastfoods WHERE title LIKE ? OR content LIKE ?', 
    [searchQuery, searchQuery], // Search in both title and content fields
    (err, results) => {
      if (err) return res.send('Error fetching results');
      res.render('search', { results }); // Pass the search results to the 'search' view
    }
  );
});

module.exports = router;
