const { Sequelize, DataTypes } = require('sequelize');

// Create the Sequelize instance with your database connection details
const sequelize = new Sequelize('bettys_books', 'bettys_books_app', 'qwertyuiop', {
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
