const { sequelize, DataTypes } = require('./sequelize');

const User = sequelize.define('user', {
  // Define columns for the `users` table
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  firstname:{
    type:DataTypes.STRING(255),
    allowNull:false
  },
  lastname:{
    type:DataTypes.STRING(255),
    allowNull:false
  },
});

module.exports = user;
