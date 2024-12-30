const { sequelize, DataTypes } = require('./sequelize');  // Import sequelize and DataTypes

// Define the FastFood model
const FastFood = sequelize.define('FastFood', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
},
{
  tableName: 'FastFoods', // Explicitly specify the table name
  timestamps: true, // Enable createdAt and updatedAt fields
}
  
);

module.exports = FastFood;
