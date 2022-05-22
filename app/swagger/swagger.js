const swaggerUi = require("swagger-ui-express")
const swaggereJsdoc = require("swagger-jsdoc")

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "Campfire API DOCS",
            description:
                "프로젝트 설명 Node.js Express RestFul API 클라이언트 UI",
        },
        servers: [
            {
                url: "http://localhost:8080", // 요청 URL
            },
        ],
    },
    apis: ['../routes/routes.js', '../routes/member.route.js'], //Swagger 파일 연동
    // apis: ['../routes/routes.js'], //Swagger 파일 연동
}
const specs = swaggereJsdoc(options);

module.exports = { swaggerUi, specs }
