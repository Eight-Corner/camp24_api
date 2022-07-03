let connection = require('../models/db.js');

const bcrypt = require('bcrypt');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;
const LocalStrategy = require('passport-local').Strategy;

// MySQL connection 실행
connection.connect(error=>{
	if(error) throw error;
	console.log("Successfully connected to the database. ");
});


const LocalStrategyOption = {
	usernameField: 'email',
	passwordField: 'password',
};

async function localVerify(email, password, done) {
	console.log("localVerify----")
	let user;
	try {
		let sql = 'select * from member where email = ?';
		let params = [email];

		await connection.query(sql, params, async function (err, rows, fields) {
			if (err) {
				console.log(err);
				return done(null, err);
			}

			if (!rows[0]) {
				return done(null, false);
			}
			user = rows[0];

			console.log(password, user.password);
			const checkPassword = await bcrypt.compare(password, user.password);
			console.log(checkPassword);

			if(!checkPassword) {
				return done(null, false);
			}
			console.log(user);
			return done(null, user);
		});
	} catch (e) {
		console.log(e);
		return done(e);
	}
}

const jwtStrategyOption = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: 'jwt-secret-key',
}

async function jwtVerify(payload, done) {
	let user;
	try {
		let sql = 'select * from member where email = ?';
		let params = [payload.email];

		await connection.query(sql, params, async function (err, rows, fields) {
			if (!rows[0]) {
				return done(null, false);
			}

			user = rows[0];
			console.log(user);
			return done(null, user);
		});

	} catch (e) {
		return done(e);
	}
}

module.exports = () => {
	passport.use(new LocalStrategy(LocalStrategyOption, localVerify));
	passport.use(new JWTStrategy(jwtStrategyOption, jwtVerify));
}
