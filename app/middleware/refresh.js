const { sign, verify, refreshVerify } = require('../utils/jwt.util');
const jwt = require('jsonwebtoken');

const refresh = async (req, res) => {
	// access token과 refresh token의 존재 유무를 체크.
	if (req.headers.authorization && req.headers.refresh) {
		const authToken = req.headers.authorization.split('Bearer ')[1];
		const refreshToken = req.headers.refresh;

		// access token 검증 -> expired여야 함.
		const authResult = verify(authToken);

		// access token 디코딩하여 user의 정보를 가져옴.
		const decoded = jwt.decode(authToken);

		// 디코딩 결과가 없으면 권한이 없음을 응답.
		if (decoded === null) {
			return res.status(401).send({
				type: false,
				message: '권한이 없습니다!',
			});
		}

		/* access token의 decoding 된 값에서
		  유저의 아이디를 가져와 refresh token을 검증. */
		const refreshResult = refreshVerify(refreshToken, decoded.email);

		// 재발급을 위해서는 access token이 만료되어 있어야 함.
		if (authResult.ok === false && authResult.message === 'jwt expired') {
			// 1. access token이 만료되고, refresh token도 만료 된 경우 => 새로 로그인.
			if (refreshResult.ok === false) {
				res.status(401).send({
					type: false,
					message: '새로 로그인해야 합니다.',
				});
			} else {
				// 2. access token이 만료되고, refresh token은 만료되지 않은 경우 => 새로운 access token을 발급
				const newAccessToken = sign(decoded.email);

				return res.status(200).send({ // 새로 발급한 access token과 원래 있던 refresh token 모두 클라이언트에게 반환.
					type: true,
					data: {
						accessToken: newAccessToken,
						refreshToken,
					},
				});
			}
		} else {
			// 3. access token이 만료되지 않은경우 => refresh 할 필요없음.
			return res.status(400).send({
				type: false,
				message: 'Access Token이 만료되지 않았습니다.',
			});
		}
	} else { // access token 또는 refresh token이 헤더에 없는 경우
		return res.status(400).send({
			type: false,
			message: '재발급 받기 위해 Access Token과 Refresh Token이 필요합니다.',
		});
	}
};

module.exports = refresh;
