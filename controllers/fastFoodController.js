const FastFood = require('../models/fastFood');

// Create a new fast food item
const createFastFood = async (req, res) => {
  const { title, content, price, stock, image } = req.body; // Include image in the request body

  if (!title || !price || !stock || !image) {
    return res.status(400).json({ message: 'Title, price, stock, and image are required' });
  }

  try {
    const newFastFood = await FastFood.create({
      title,
      content,
      price,
      stock,
      image, // Save the image string directly
    });
    res.status(201).json({ message: 'Fast food item added successfully', fastFood: newFastFood });
  } catch (error) {
    res.status(500).json({ message: 'Error adding fast food item', error: error.message });
  }
};

const getAllFastFoods = async (req, res) => {
    try {
      const fastFoods = await FastFood.findAll();  // Sequelize method to get all records
      res.status(200).json(fastFoods);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving fast food items', error: error.message });
    }
  };
module.exports = {
  createFastFood,
  getAllFastFoods
};
