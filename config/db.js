const mysql = require('mysql')

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"root",
    database:"vulnerabilities"
});

module.exports = db