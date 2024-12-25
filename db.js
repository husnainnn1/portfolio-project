const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'food_user_app',
  password: 'Abdulhadi123',
  database: 'project_food',
  waitForConnections: true,   // Wait for available connections in the pool
  connectionLimit: 10,        // Maximum number of connections
  queueLimit: 0               // No limit on queueing requests
});

// Export the pool as a promise-based API for easier usage
module.exports = pool.promise();


//previous code that was giving error for search page
/* const mysql = require('mysql2');

//const connection = mysql.createConnection({
 // host: process.env.DB_HOST || 'localhost',
//  user: process.env.DB_USER || 'root',
//  password: process.env.DB_PASSWORD || 'abcd',
//  database: process.env.DB_NAME || 'project_food',
//});

const connection = mysql.createConnection ({
  host: 'localhost',
  user: 'food_user_app',
  password: 'Abdulhadi123',
  database: 'project_food'
})


connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

module.exports = connection;*/