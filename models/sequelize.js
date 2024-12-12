const { Sequelize, DataTypes } = require('sequelize');

// Create the Sequelize instance with your database connection details
const sequelize = new Sequelize('project_food', 'food_user', 'Abdulhadi123', {
  host: 'localhost',
  dialect: 'mysql',
});

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connected to the database.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Export the sequelize instance and DataTypes
module.exports = { sequelize, DataTypes };  // Export sequelize and DataTypes
