const express = require('express');
const db = require('../db');
const router = express.Router();


// Search Fast Foods (POST request to handle search)
router.post('/', async (req, res) => {
  try {
    const searchQuery = `%${req.body.query}%`; // Use the search term entered by the user

    db.query(
      'SELECT * FROM fastfoods WHERE title LIKE ? OR content LIKE ?',
      [searchQuery, searchQuery], // Search in both title and content fields
      (err, results) => {
        if (err) {
          console.error('Error fetching results:', err);
          return res.status(500).send('Internal Server Error');
        }

        res.render('search', { results }); // Pass the search results to the 'search' view
      }
    );
  } catch (error) {
    console.error('Unexpected Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;