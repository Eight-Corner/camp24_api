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
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));
// dotenv, colors
dotenv.config({ path: 'src/config/config.env' });

// routes
require("./app/routes/customer.route.js")(app);
require("./app/routes/test.route.js")(app);


// Custom middleware here
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

// 포트넘버 설정
app.listen(PORT, () => {
    console.log(`Server up and running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
});
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, ()=>{
//     console.log("Server is running on port 8080.");
// })
