const swaggerUi = require("swagger-ui-express")
const swaggerJSDoc = require('swagger-jsdoc');

var swaggerDefinition = {
    info : { // 정보 작성
        version: "1.0.0",
        title: "Campfire API DOCS",
        description: "프로젝트 설명 Node.js Express RestFul API 클라이언트 UI",
    },
    host : "localhost:8080", // base-url
    basePath : "/api" // base path
};

var options = {
    swaggerDefinition: swaggerDefinition,
    apis : [__dirname + '/../routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
