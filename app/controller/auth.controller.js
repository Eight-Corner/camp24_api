// const jwt = require('jsonwebtoken');
const db = require("../models");
const Member = db.Member;

const crypto = require('crypto');

const jwt = require('../utils/jwt.util');
const redisClient = require("../utils/redis.util");
const ejs = require('ejs');
const nodemailer = require('nodemailer');
const path = require('path');
let appDir = path.dirname(require.main.filename) + '/app';

/***********************
 * Description : 에러처리 함수
 ************************/
function errFunction(res) {
	return res.status(200).json({
		status: 500,
		message: "Error: 이메일 인증 서버에 문제가 발생하였습니다."
	});
}


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
		return res.status(200).json({
			status: 400,
			message: "Error: Body(JSON)값이 비어있습니다."
		});
	}
	if (req.body.hasOwnProperty('email') === false || req.body.hasOwnProperty('password') === false) {
		return res.status(200).json({
			status: 400,
			message: "Error: 이메일 또는 비밀번호가 없습니다."
		});
	}

	const {email, password} = req.body

	let info = {type: false, message: ''};

	crypto.createHash('sha512').update(password).digest('base64');
	let hex_password = crypto.createHash('sha512').update(password).digest('hex');

	let org_password = '';

	await Member.findOne({
		where: {email: email}
	}).then(respond => {

		if (!respond) {

			info.message = '존재하지 않는 유저입니다.'
			return res.status(200).json({
				status: 403,
				info: info,
			});

		} else {

			org_password = respond.password;

			if (hex_password === org_password) {

				const accessToken = jwt.sign(respond.email);
				const refreshToken = jwt.refresh();

				// redis에 이메일과 토큰을 담음
				redisClient.set(respond.email, refreshToken);

				info.message = 'success';
				res.setHeader('Content-Type','application/json; charset=utf-8');
				res.setHeader('Authorization', 'Bearer ' + accessToken);
				res.setHeader('Refresh', 'Bearer ' + refreshToken);
				// 헤더에 담아주기도 하고, response 값으로도 보내줌.
				return res.status(200).json({
					status: 200,
					info: info,
					token: {
						accessToken: accessToken,
						refreshToken: refreshToken
					}
				});

			} else {

				info.message = '비밀번호가 일치하지 않습니다.'
				return res.status(200).json({
					status: 403,
					info: info,
				});

			}

		}

	}).catch(err => {
		info.message = '로그인 실패 : ' + err;
		return res.status(200).json({
			status: 500,
			info: info,
		});
	});

}


exports.check = (req, res) => {
	const info = req.decoded;
	info.message = '로그인 성공';
	info.type = true;

	res.status(200).json({
		success: true,
		status: 200,
		info: info,
	})
};


/*************************
 * Developer: corner,
 * Description: 회원가입 이메일 인증
 * ***********************/
exports.emailSignUp = async (req, res) => {
	let auth_key = '';
	let emailTemplates;

	if (!req.body.hasOwnProperty('email') || req.body.email == '') {
		return res.status(400).json({
			status: 400,
			message: "Error: 이메일이 없습니다."
		});
	}

	auth_key = Math.random().toString().substring(2, 6);
	ejs.renderFile(appDir + '/utils/authMail.ejs', {authCode: auth_key}, async (err, data) => {
		if (err) {
			console.log(err);
			await errFunction(res);
		}
		emailTemplates = data;
	});

	let transporter = nodemailer.createTransport({
		service: 'gmail',
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		auth: {
			user: process.env.NODEMAILER_USER,
			pass: process.env.NODEMAILER_PASS
		},
	});

	console.log(emailTemplates)

	let mailOptions = await transporter.sendMail({
		from: '캠핑친구24',
		to: req.body.email,
		subject: '회원가입을 위한 인증번호를 입력해주세요.',
		html: emailTemplates,
	});

	transporter.sendMail(mailOptions, async (err, info) => {
		if (err) {
			console.log(err);
			await errFunction(res);
		}
		console.log("sending mail.." + info.response);
		res.send(auth_key);
		transporter.close();
	});


}
