require('dotenv').config(); 
const express = require('express'); // Import Express framework.
const session = require('express-session'); // Import session management.
const bodyParser = require('body-parser'); // Parse incoming request bodies.
const bcrypt = require('bcryptjs'); // For hashing passwords.
const fastFoodRoutes = require('./routes/fastFood'); // Fast food routes.
const db = require('./db'); // Database configuration.
const FastFood = require('./models/fastFood'); // FastFood model.
const jokeRouter = require('./routes/joke'); // Joke routes.
const multer = require('multer'); // Middleware for handling file uploads.
const upload = multer({ dest: 'uploads/' }); // Configure file upload destination.
const searchRouter = require('./routes/search'); // Update the path to your search.js file

const app = express(); // Initialize Express app.

var appData = {RestauramtName: "Speedy Bites"}

app.use(bodyParser.urlencoded({ extended: true })); // Middleware for URL-encoded data.
app.use(express.static('public')); // Serve static files from "public" directory.
app.set('view engine', 'ejs'); // Set EJS as the view engine.
app.use(express.json()); // Parse incoming JSON payloads.

app.use(
  session({
    secret: 'simpleSecret', // Secret for signing session ID cookie.
    resave: false, // Don't save session if not modified.
    saveUninitialized: true, // Save uninitialized sessions.
  })
);

app.get('/', (req, res) => {
  res.render('index', { user: req.session.user }); // Render homepage with user session.
});
// Render "About" page.
app.get('/about', (req, res) => res.render('about')); 
// Use joke routes.
app.use('/jokes', jokeRouter); 
// Use fast food routes.
app.use('/fastfood', fastFoodRoutes); 
// API routes for posts.
app.use('/posts', require('./routes/api')); 
// Authentication routes.
app.use('/auth', require('./routes/auth')); 
// Search functionality routes.
//app.use('/search', require('./routes/search')); 
// Render search page.
//app.use('/search', (req, res) => res.render('search')); 

// Route to render search page (GET request)
app.get('/search', (req, res) => {
  res.render('search', { results: [] }); // Render the page with an empty results array.
});

// Route to handle search form submission (POST request)
app.use('/search', searchRouter); // Mount search router for POST requests.



// Render add food page.
app.use('/addfood', (req, res) => res.render('food')); 
// Render login page.
app.get('/login', (req, res) => res.render('login')); 
// Render registration page.
app.get('/register', (req, res) => res.render('register')); 
app.get('/menu', async (req, res) => {
  try {
    const fastFoodItems = await FastFood.findAll({
      // Fetch all fast food items with specific attributes.
      attributes: ['id', 'title', 'content', 'price', 'stock', 'image', 'createdAt', 'updatedAt'],
    });
    // Get logged-in user from session.
    const user = req.session.user || null; 
    // Render menu page with items and user data.
    res.render('menu', { fastFoods: fastFoodItems, user }); 
  } catch (error) {
    // Log errors.
    console.error('Error fetching fast food items:', error); 
    res.status(500).send('Error loading menu.'); 
  }
});

const PORT = process.env.PORT || 8000; 
app.listen(PORT, () => console.log(`Node app listening on port ${PORT}`)); // Start server.
