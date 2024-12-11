const express = require('express');
const fastFoodController = require('../controllers/fastFoodController');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// POST a new fast food item
router.post('/add', fastFoodController.createFastFood);

router.get('/getfast',fastFoodController.getAllFastFoods);

module.exports = router;
