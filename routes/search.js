const express = require('express');
const db = require('../db'); // Assuming you have a database connection file
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();
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
/*router.post('/', function (req, res) {
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
});*/

router.post('/', function (req, res) {
  const keyword = req.body.query; // Extract 'query' from POST body

  // SQL query to search for fast food
  const sqlquery = `SELECT * FROM FastFoods WHERE title LIKE '%${keyword}%'`;

  db.query(sqlquery, (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.redirect("/"); // Redirect on error
    }

    console.log("Database query result:", result); // Log query results for debugging

    // Pass 'existingTitle' to the EJS template
    const newData = {
      ...appData, // Include app-specific data
      existingTitle: result || [] // Ensure result is an array
    };
    res.render("search.ejs", {
      existingTitle: [
        { title: 'Pizza', content: 'Cheesy pizza', price: 10, stock: 5, image: 'pizza.jpg' },
        { title: 'Burger', content: 'Juicy burger', price: 8, stock: 3, image: 'burger.jpg' }
      ]
    });
    res.render("search.ejs", newData); // Render EJS with newData
  });
});


module.exports = router;
