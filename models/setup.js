const { sequelize } = require('./sequelize');
const User = require('./user');
const Post = require('./post'); 
const FastFood = require('./models/FastFood');

sequelize.sync({ force: false }) 
  .then(async () => {
    console.log('Tables have been synced.');

    // Insert sample posts
    await Post.findOrCreate({
      where: { title: 'First Post' },
      defaults: { content: 'This is the first post content' },
    });
    await Post.findOrCreate({
      where: { title: 'Second Post' },
      defaults: { content: 'Another great piece of content!' },
    });

    console.log('Sample posts inserted.');
  })
  .catch((err) => {
    console.error('Error syncing models:', err);
  });
