const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'SoccerSaiyan508_',
    database: 'company'
  },
);

module.exports = db;