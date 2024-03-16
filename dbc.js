// Import the mysql module
const mysql = require('mysql');
require("dotenv").config()


// Create a connection pool to manage connections
const pool = mysql.createPool({
  connectionLimit: 10, // Set the maximum number of connections
  host: process.env.HOST, // MySQL server host (replace with your host if different)
  user: process.env.USER, // MySQL username
  password: process.env.PASS, // MySQL password
  database: process.env.DB, // MySQL database name
});

// Export the pool to use it in other modules
module.exports = pool;
