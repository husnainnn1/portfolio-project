const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { username, password, firstname, lastname } = req.body;
  
  console.log(username, password, firstname, lastname);  // Debug log
  
  if (!password || !username || !firstname || !lastname) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password
    const newUser = await User.create({
      firstname,
      lastname,
      username,
      password: hashedPassword,
    });

    return res.render('login')

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
  
});
// Login a user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { username } });
  
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      const match = await bcrypt.compare(password, user.password);
  
      if (!match) {
        return res.status(401).send('Invalid credentials');
      }
  
      // Start session and save user info
      req.session.user = user; 
      res.redirect('https://www.doc.gold.ac.uk/usr/378/'); 
    } catch (error) {
      res.status(500).send('Error logging in');
    }
});

// Logout a user
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.redirect('/');
    });
});

module.exports = router;
