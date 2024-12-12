const mysql = require('mysql2');

//const connection = mysql.createConnection({
 // host: process.env.DB_HOST || 'localhost',
//  user: process.env.DB_USER || 'root',
//  password: process.env.DB_PASSWORD || 'abcd',
//  database: process.env.DB_NAME || 'project_food',
//});

const connection = mysql.createConnection ({
  host: 'localhost',
  user: 'food_user',
  password: 'Abdulhadi123',
  database: 'project_food'
})


connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

module.exports = connection;
