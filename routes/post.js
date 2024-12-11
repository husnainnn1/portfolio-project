const express = require('express');
const Post = require('../models/post');
const router = express.Router();

router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts', error: err.message });
  }
});

module.exports = router;
