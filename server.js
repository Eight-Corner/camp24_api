const express = require("express");
const app = express();
const dotenv = require('dotenv');
const colors = require('colors');

const cors = require('cors');

// middleware
const notFound = require('./app/middleware/notFound');
const errorHandler = require('./app/middleware/errorHandler');

// database
const models = require("./app/models/index.js");
models.sequelize.sync().then(() => {
   console.log("DB Connect Success");
}).catch((err) => {
   console.log("DB Connect Error", err);
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// cors
// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
// }));
let isDev = true; // true : dev, false; prod

let config = {
    dev: {
        domain: "ec2-52-79-82-151.ap-northeast-2.compute.amazonaws.com",
    },
    prod: {
        domain: "ec2-52-79-82-151.ap-northeast-2.compute.amazonaws.com",
    },
}

function getConfig(key = 'domain') {
    return isDev ? config.dev[key] : config.prod[key];
}
// const devOrigin = 'http://localhost:3000';
// const prodOrigin = 'https://front-campfire-web.vercel.app';
const corsOptions = {
    origin: getConfig('domain'),
    credentials: true
}

app.use(cors(corsOptions));
// dotenv, colors
dotenv.config({ path: 'src/config/config.env' });

const swaggerUi = require('swagger-ui-express');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(require('./app/swagger/swagger')));

// routes
const router = require("./app/routes/routes.js");
app.use('/', router)


// Custom middleware here
app.use(notFound);
app.use(errorHandler);

if (isDev) {
    process.env.PORT = "80";
} else {
    process.env.PORT = "80";
}

// 포트넘버 설정
const PORT = isDev ? process.env.PORT : process.env.PORT;
app.listen(PORT, () => {
    console.log(`::::::Server up and running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
});
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, ()=>{
//     console.log("Server is running on port 8080.");
// })
