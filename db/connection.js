require("dotenv").config();
const mysql = require('mysql2');

const connection = mysql.createConnection(
    {
      host: process.env.DB_HOST,
      // MySQL username,
      user: process.env.DB_USER,
      // MySQL password
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      // rowsAsArray: true
    });

connection.connect(function (err) {
  if (err) throw err;
  console.log("connection established!")
});

module.exports = connection;