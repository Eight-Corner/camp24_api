// jwtUtil-util.js
const { promisify } = require('util');
const jwtUtil = require('jsonwebtoken');
const redisClient = require('./redis.util');
const secret = process.env.JWT_KEY;


module.exports = {
	sign: (email) => { // access token 발급
		const payload = { // access token에 들어갈 payload
			email: email
		};
		return jwtUtil.sign(payload, secret, { // secret으로 sign하여 발급하고 return
			expiresIn: '1h', 	  // 유효기간
			algorithm: 'HS256', // 암호화 알고리즘
		});
	},
	verify: (token) => { // access token 검증
		let decoded = null;
		try {
			decoded = jwtUtil.verify(token, secret);
			return {
				type: true,
				email: decoded.email,
			};
		} catch (err) {
			return {
				type: false,
				message: err.message,
			};
		}
	},
	refresh: () => { // refresh token 발급
		return jwtUtil.sign({}, secret, { // refresh token은 payload 없이 발급
			algorithm: 'HS256',
			expiresIn: '14d',
		});
	},
	refreshVerify: async (token, email) => { // refresh token 검증
		/* redis 모듈은 기본적으로 promise를 반환하지 않으므로,
		   promisify를 이용하여 promise를 반환해주기.*/
		const getAsync = promisify(redisClient.get).bind(redisClient);

		try {
			const data = await getAsync(email); // refresh token 가져오기
			if (token === data) {
				try {
					jwtUtil.verify(token, secret);
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
