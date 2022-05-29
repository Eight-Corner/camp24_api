// Sequelize 사용하지 않을 때 DB 커넥션

const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");

// 데이터베이스 connection 객체 생성
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    port: dbConfig.PORT,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

// MySQL connection 실행
connection.connect(error=>{
    if(error) throw error;
    console.log("Successfully connected to the database. ");
})

module.exports = connection;
