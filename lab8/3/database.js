//database.js

const mysql = require('mysql2');
const conn = mysql.createConnection( {
    host: "webdev.it.kmitl.ac.th",
    user: "s67070041",
    password: "LXJ32AJN25U",
    database: "s67070041"
});

conn.connect( error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

//export object conn ออกไป
module.exports = conn;