const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: "root",
  password: "0000",
  database: "login_lecture",
});

db.connect();

module.exports = db;
