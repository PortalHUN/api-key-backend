const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DBHOST || "localhost",
  user: process.env.DBUSER || "root",
  password: process.env.DBPASS || "",
  database: process.env.DB || "api",
});

connection.connect((err) => {
  if (err) throw err;
  else console.log(`[DB] Connected to database...`);
});

module.exports = connection;
