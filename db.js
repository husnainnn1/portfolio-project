const mysql = require('mysql2');

//const connection = mysql.createConnection({
 // host: process.env.DB_HOST || 'localhost',
//  user: process.env.DB_USER || 'root',
//  password: process.env.DB_PASSWORD || 'abcd',
//  database: process.env.DB_NAME || 'project_food',
//});

const connection = mysql.createConnection ({
  host: 'localhost',
  user: 'bettys_books_app',
  password: 'qwertyuiop',
  database: 'bettys_books'
})


connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

module.exports = connection;
