const express = require('express');
const db = require('../db'); // Assuming you have a database connection file
const router = express.Router();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var appData = {RestauramtName: "Speedy Bites"}

// Search Fast Foods (POST request to handle search)
/*  router.post('/', async (req, res) => {
    try {
      const searchQuery = `%${req.query.keyword}%`; // Use the search term entered by the user

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
*/

//search result for extension search-topics
router.post('/', function (req, res) {
  // Extract the query keyword from the POST body
  const keyword = req.body.query;
  //searching in the database
  let sqlquery = `SELECT * FROM FastFoods WHERE title LIKE '%${keyword}%'`;
  //execute code
  db.query(sqlquery, (err, result) => {
      if(err){
        console.error("Database query error:", err);
          //if code doesn't run it'll run this 
          return res.redirect("./")
      }
      const newData = Object.assign({}, appData, {existingTitle:result || []});
      console.log(newData)
      res.render("search.ejs", newData)
  });
});


module.exports = router;
