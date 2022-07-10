const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, res, next) => {
	const headers = req.headers;
	if (!headers.hasOwnProperty('authorization')) {
		return res.status(200).json({
			status: 403,
			success: false,
			message: '로그인이 필요합니다.'
		});
	}
	const token = req.headers.authorization.split('Bearer ')[1] || req.headers['x-access-token']
	if (!token || token === 'null') {
		return res.status(200).json({
			status: 403,
			success: false,
			message: '로그인이 필요합니다.'
		})
	}
	// 토큰이 유효한지 검증

	let info = {
		type: false,
		message: ''
	}

	const p = new Promise((resolve, reject) => {
		jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
			if (err) { // 토큰이 일치하지 않음.
				console.error(err)
				info.type = false;
				info.message = '토큰이 일치하지 않습니다.';
				return res.status(200).json({
					status: 403,
					success: false,
					info: info,
				})
			}
			resolve(decoded);
		})
	});

	p.then((decoded) => {
		req.decoded = decoded;
		next();
	})

}
