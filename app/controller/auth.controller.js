const jwt = require('jsonwebtoken');
const db = require("../models");
const Member = db.Member;

const crypto = require('crypto');

// password Check
exports.decipher = (password, key) => {
	return new Promise((resolve, reject) => {
		const decode = crypto.createDecipher('des', key);
		const decodeResult = decode.update(password, 'base64', 'utf8')
		+ decode.final('utf8');
		resolve(decodeResult);
	});
}

exports.login = async (req, res) => {
	if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
		res.status(400).json({
			message: "Error: Body(JSON)값이 비어있습니다."
		});
	}
	const {email, password} = req.body
	const secret = process.env.JWT_SECRET;
	let info = {type: false, message: ''};

	crypto.createHash('sha512').update(password).digest('base64');
	let hex_password = crypto.createHash('sha512').update(password).digest('hex');

	let org_password = '';

	await Member.findOne({
		where: {email: email}
	}).then(respond => {

		if (!respond) {

			info.message = '존재하지 않는 유저입니다.'
			return res.status(403).json({
				status: 403,
				info: info,
			});

		} else {

			org_password = respond.password;

			if (hex_password === org_password) {

				const p = new Promise((resolve, reject) => {
					jwt.sign({email: respond.email}, secret, {expiresIn: '7d'}, (err, token) => {

						if (err) {
							reject(err);
						}
						resolve(token);
						info.message = '로그인 성공';

						return res.status(200).header({
							'bearer': token,
						}).json({
							status: 200,
							info: info,
							token: token
						});

					});
				});

				return p;

			} else {

				info.message = '비밀번호가 일치하지 않습니다.'
				return res.status(403).json({
					status: 403,
					info: info,
				});

			}

		}

	}).catch(err => {
		info.message = '로그인 실패 <br/>' + err;
		return res.status(500).json({
			status: 500,
			info: info,
		});
	});

}

exports.check = (req, res) => {
	res.json({
		success: true,
		info: req.decoded
	})
};
