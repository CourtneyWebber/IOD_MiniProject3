const mysql = require("mysql");
const dbConfig = require("./db_config.js");

module.exports = connection = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    multipleStatements: true
});

//removed db name