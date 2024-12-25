const express = require('express');
const db = require('../db'); // Assuming the database connection uses a connection pool
const router = express.Router();

var appData = { RestauramtName: "Speedy Bites" };

// Search Fast Foods (POST request to handle search)
router.post('/', async (req, res) => {
  try {
    const keyword = `%${req.body.keyword}%`; // Extract the search term from the POST body

    // Perform the database query using async/await
    const [results] = await db.query(
      'SELECT * FROM FastFoods WHERE title LIKE ? OR content LIKE ?',
      [keyword, keyword] // Use parameterized queries to prevent SQL injection
    );

    // Pass the results to the EJS template
    const newData = Object.assign({}, appData, { results });
    res.render('search.ejs', newData); // Render the EJS template with the search results
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;



//old code for search.js 
/*const express = require('express');
const db = require('../db'); // Assuming you have a database connection file
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));

var appData = {RestauramtName: "Speedy Bites"}

// Search Fast Foods (POST request to handle search)
 router.post('/', async (req, res) => {
    try {
      const searchQuery = `%${req.body.keyword}%`; // Use the search term entered by the user

      // Perform the database query
      db.query(
        'SELECT * FROM FastFoods WHERE title LIKE ? OR content LIKE ?',
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

  // Mount the router
app.use('/', router);
*/

