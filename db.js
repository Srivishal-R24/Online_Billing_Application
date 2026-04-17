const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '127.0.0.1', // ✅ Standard local host
    user: 'root',
    password: '',
    database: 'supermarket',
    port: 3306
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

module.exports = db;