const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const url = 'https://v2.jokeapi.dev/joke/Any';
    const response = await axios.get(url);
    res.render('joke', { joke: response.data });
  } catch (error) {
    console.error("Error in fetching joke data", error);
  }
});

module.exports = router;
