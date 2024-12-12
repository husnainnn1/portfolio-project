const express = require('express');
const db = require('../db'); // Assuming you have a database connection file
const router = express.Router();

// Search Fast Foods (POST request to handle search)
router.post('/', async (req, res) => {
  try {
    const searchQuery = `%${req.body.query}%`; // Use the search term entered by the user

    // Perform the database query
    db.query(
      'SELECT * FROM fast_foods WHERE title LIKE ? OR content LIKE ?',
      [searchQuery, searchQuery], // Search in both title and content fields
      (err, results) => {
        if (err) {
          console.error('Error fetching results:', err);
          return res.status(500).send('Internal Server Error');
        }

        // Pass the results to the EJS template
        res.render('search', { results }); // 'results' is passed to the 'search.ejs' view
      }
    );
  } catch (error) {
    console.error('Unexpected Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
