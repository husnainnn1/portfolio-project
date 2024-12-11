require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const fastFoodRoutes = require('./routes/fastFood');
const db = require('./db');
const FastFood =require('./models/fastFood');
const jokeRouter = require('./routes/joke');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
 
app.use(
  session({
    secret: 'simpleSecret',
    resave: false,
    saveUninitialized: true,
  })
);

app.get('/', (req, res) => {
    // Pass the session user to EJS
    res.render('index', { user: req.session.user });
});
app.get('/about', (req, res) => res.render('about'));
app.use('/jokes', jokeRouter);
app.use('/fastfood', fastFoodRoutes);
app.use('/posts',require('./routes/api'))
app.use('/auth', require('./routes/auth'));
app.use('/search', require('./routes/search'));
app.use('/search',(req,res)=>res.render('search'))
app.use('/addfood',(req,res)=>res.render('food'))
app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));
app.get('/menu', async (req, res) => {
    try {
      // Fetch fast food items from the database
      const fastFoodItems = await FastFood.findAll({
        attributes: ['id', 'title', 'content', 'price', 'stock', 'image', 'createdAt', 'updatedAt']
      });
  
      // You can pass other data as needed (like user data from session)
      const user = req.session.user || null;  // or any other method of retrieving the logged-in user
  
      // Render the view and pass the correct data
      res.render('menu', { fastFoods: fastFoodItems, user });
    } catch (error) {
      console.error('Error fetching fast food items:', error);
      res.status(500).send('Error loading menu.');
    }
  });

  
  
//http://localhost:8000/fastfood/getfast

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
