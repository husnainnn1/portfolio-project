const { sequelize, DataTypes } = require('./sequelize');

const Post = sequelize.define('Post', {
  // Define columns for the `posts` table
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Post;
