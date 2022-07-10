// jwt-util.js
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const redisClient = require('./redis');
const secret = process.env.JWT_KEY;


module.exports = {
	sign: (email) => { // access token 발급
		const payload = { // access token에 들어갈 payload
			email: email
		};
		return jwt.sign(payload, secret, { // secret으로 sign하여 발급하고 return
			expiresIn: '1h', 	  // 유효기간
			algorithm: 'HS256', // 암호화 알고리즘
		});
	},
	verify: (token) => { // access token 검증
		let decoded = null;
		try {
			decoded = jwt.verify(token, secret);
			return {
				ok: true,
				email: decoded.email,
				role: decoded.role,
			};
		} catch (err) {
			return {
				ok: false,
				message: err.message,
			};
		}
	},
	refresh: () => { // refresh token 발급
		return jwt.sign({}, secret, { // refresh token은 payload 없이 발급
			algorithm: 'HS256',
			expiresIn: '14d',
		});
	},
	refreshVerify: async (token, email) => { // refresh token 검증
		/* redis 모듈은 기본적으로 promise를 반환하지 않으므로,
		   promisify를 이용하여 promise를 반환하게 해줍니다.*/
		const getAsync = promisify(redisClient.get).bind(redisClient);

		try {
			const data = await getAsync(email); // refresh token 가져오기
			if (token === data) {
				try {
					jwt.verify(token, secret);
					return true;
				} catch (err) {
					return false;
				}
			} else {
				return false;
			}
		} catch (err) {
			return false;
		}
	},
};
