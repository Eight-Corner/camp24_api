// todo:: true : dev, false: prod
let isDev = false

// HOST: 'localhost',
let config = {
    dev: {
        HOST: '127.0.0.1',
        USER: 'admin',
        PASSWORD: 'Thiskim12!@',
    },
    prod: {
        HOST: '127.0.0.1',
        USER: 'admin',
        PASSWORD: 'Thiskim12!@',
    },
}

function getConfig(key) {
    // return config.dev[key];
    return isDev ? config.dev[key] : config.prod[key];
}

//    "host": "ec2-107-23-80-232.compute-1.amazonaws.com",
module.exports = {
    isDev,
    config,
    getConfig,
    HOST: "127.0.0.1",
    PORT: "3306",
    USER: getConfig('USER'),
    PASSWORD: "Thiskim12!@",
    DB: "camp24",
    dialect: "mysql",
    dialectOptions: {
        charset: "utf8mb4",
        dataStrings: true,
        typeCast: true
    },
    timezone: "+09:00",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false,
        supportBigNumbers: true,
    },
};
