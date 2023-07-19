const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "employees_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("The database is connected!");
});

module.exports = db;
