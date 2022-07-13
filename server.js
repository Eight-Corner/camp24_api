const express = require("express");
const app = express();
const dotenv = require('dotenv');
const colors = require('colors');

const cors = require('cors');

// middleware
const notFound = require('./app/middleware/notFound');
const errorHandler = require('./app/middleware/errorHandler');

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

// cors
db = require("./app/config/db.config.js");

const corsOptions = {
    origin: '*',
    credentials: true
}

app.use(cors(corsOptions));
// dotenv, colors
dotenv.config({ path: 'app/config/config.env' });

const swaggerUi = require('swagger-ui-express');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(require('./app/swagger/swagger')));

// routes
const router = require("./app/routes/routes.js");
app.use('/', router)

//ssl 자체 인증(서명) 서버를 만들기위해서는 key와 csr이 필요하다.
/*
const https = require('https');
const fs = require('fs');
const path = require('path');

const sslServer = https.createServer(
	{
		key: fs.readFileSync(path.join(__dirname, "cert", "key.pem"), "utf-8"),
		cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem"), "utf-8"),
	},
	app
);
sslServer.listen(PORT, () => {
    console.log(`::::::Server up and running is Develop mode on port ${PORT}`.yellow.bold)
});
*/

// Custom middleware here
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`::::::Server up and running is Develop mode on port ${PORT}`.yellow.bold)
});
