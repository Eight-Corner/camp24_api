const express = require("express");
const app = express();
const dotenv = require('dotenv');
const colors = require('colors');

const cors = require('cors');

// middleware
const notFound = require('./app/middleware/notFound');
const errorHandler = require('./app/middleware/errorHandler');

const passport = require('passport');
const passportConfig = require('./app/config/passport.js');
// const logger = require('morgan');
// app.use(logger);

// database
const models = require("./app/models/index.js");
models.sequelize.sync().then(() => {
    console.log("DB Connect Success");
}).catch((err) => {
    console.log("DB Connect Error", err);
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// passport
app.use(passport.initialize());
passportConfig();

// cors
db = require("./app/config/db.config.js");

const corsOptions = {
    origin: db.getConfig('host'),
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

// 포트넘버 설정
NODE_ENV = 'development';
process.env.PORT = "80";
process.env.JWT_SECRET = "jwt-secret-key";

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`::::::Server up and running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
});
