const mysql = require("mysql");
require('dotenv').config();

const con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.DB
});

con.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = con;