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
dotenv.config({path: 'app/config/config.env'});

const swaggerUi = require('swagger-ui-express');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(require('./app/swagger/swagger')));

// routes
const router = require("./app/routes/routes.js");
app.use('/', router)

//ssl 자체 인증(서명) 서버를 만들기위해서는 key와 csr이 필요하다.
const https = require('https');
const http = require("http");
const fs = require('fs');
const path = require('path');
// Custom middleware here
app.use(notFound);
app.use(errorHandler);


/* SSL option */
// production 모드에서는 option 이 truthy한 값
// development 모드에서는 option 이 falsy한 값
const {getConfig, isDev} = require("./app/config/db.config.js");

const PORT = isDev ? process.env.PORT : 443;
const option = {
	key: fs.readFileSync(path.join(__dirname, "cert", "/develop-corner_com.key"), "utf-8"),
	cert: fs.readFileSync(path.join(__dirname, "cert", "/develop-corner_com__crt.pem"), "utf-8"),
	ca: fs.readFileSync(path.join(__dirname, "cert", "/develop-corner_com__bundle.pem"), "utf-8")
}
// production 모드에서는 https 서버를
// development 모드에서는 http 서버를 사용합니다
isDev ?
	http.createServer(app).listen(PORT, () => {
		console.log(`Server is running at port ${PORT}`.yellow.bold);
	})
	:
	https.createServer(option, app).listen(443, () => {
		console.log(`SSL Server is running at port ${PORT}`.yellow.bold);
	})
;
/*
const sslServer = https.createServer(
	{
		// key: fs.readFileSync(path.join(__dirname, "cert", "key.pem"), "utf-8"),
		// cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem"), "utf-8"),
		key: fs.readFileSync(__dirname + '/인증서경로/domain_xxxxx.key.pem'),
		cert: fs.readFileSync(__dirname + '/인증서경로/domain_xxxxx.crt.pem'),
		ca: fs.readFileSync(__dirname + '/인증서경로/ca-chain-bundle.pem')
	},
	app
);
sslServer.listen(PORT, () => {
    console.log(`::::::Server up and running is Develop mode on port ${PORT}`.yellow.bold)
});*/

/*app.listen(PORT, () => {
    console.log(`::::::Server up and running is Develop mode on port ${PORT}`.yellow.bold)
});*/

