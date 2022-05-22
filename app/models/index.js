/*
'use strict';

const fs = require('fs'); //파일시스템 읽고 쓰기위한 라이브러리
const path = require('path'); //로컬 경로 탐색을 위한 라이브러리
const Sequelize = require('sequelize'); // Sequelize 클래스 라이브러리
const basename = path.basename(__filename); // 현재 이 파일이름 'index.js' (아래에서 현재 파일을 제외하기 위해 사용)
const env = process.env.NODE_ENV || 'development'; // 현재 node 실행 환경을 가져옴
const config = require(__dirname + '/../config/config.json')[env]; // 위에서 정의한 db접속 환경설정(config.json)이 담긴 object를 가져옴
const db = {}; // 빈 오브젝트 선언

let sequelize; // 빈 변수 선언 (세션이 담길 변수)
if (config.use_env_variable) { // db 환경설정 파일(config.json)에서 (보안등의 이유로) 접속 정보를 환경변수에 담아 이 것을 읽어올 것인지 정의할 수 있음.
  sequelize = new Sequelize(process.env[config.use_env_variable], config); //db와 새로운 세션을 맺는다. (환경변수 읽음)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config); //db와 새로운 세션을 맺는다. (config.json 읽음)
}

// 모델 생성 ! (모델은 데이터베이스의 테이블 정보임)
fs
    .readdirSync(__dirname) // 현재 디렉터리의 파일들을 모두 읽어옴.
    .filter(file => {
      // .으로 시작하지 않고 (숨김파일) && index.js(자기자신)파일이 아니고 && .js 확장자를 가진 파일만 남긴다.
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {  // 남은 파일들은 모델(Model)이라고 간주하고 하나씩 불러와서 db object에 담는다.
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes); // << ES6 문법임 !!!
      db[model.name] = model;  // 오브젝트에 모델들을 담는다.
    });

// 각 모델들을 돌면서 모델간의 관계를 정의하는 함수를 동작시킴. (associate)
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db); // 관계를 정의하기 위해선 다른 모델을 참고해야하기 때문에 모델들이 담긴 db를 파라미터로 넘긴다.
  }
});

db.sequelize = sequelize; // 세션과
db.Sequelize = Sequelize; // Class를 db에 추가

module.exports = db; // export
*/

const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// routes 사용
db.Member = require("./member.js")(sequelize, Sequelize);

module.exports = db;
