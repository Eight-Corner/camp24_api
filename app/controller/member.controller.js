const db = require("../models");
const Member = db.Member;
// express-crypto
const crypto = require('crypto');

let info = {
	'type': false,
	message: "failed",
}

/**********************
 * Developer : Corner
 * Description : 유효성 체크, JSON 형식
 **********************/
const emptyJson = (obj) => {
	return obj.constructor === Object && Object.key(obj).length === 0;
}
/**********************
 * Developer : Corner
 * Description : 유효성 체크, Properties Check
 **********************/
const emptyProperty = (obj, key) => {
	return !obj.hasOwnProperty(key) || obj[key] === '';
}

/**********************************
 * Developer : Corner
 * Description : 유저 관련 컨트롤러
 **********************************/
// 유저 전체 조회
exports.findAll = async (req, res) => {
    await Member.findAll({
        limit: 10,
    }).then((result) => {
        let response = [];
        result.forEach(value => {
            response.push({
                m_no: value.m_no,
                nickname: value.nickname,
                email: value.email,
                createdAt: value.createdAt,
            });
        });
        res.status(200).send({status: 200, result: response, message: "success"});
    }).catch((err) => {
        res.status(500).json({status: 500, message: err.message});
    });
};


/**********************
 * Developer : Corner
 * Description : 유저 단일 조회
 **********************/
exports.findOne = async (req, res) => {
    await Member.findOne({
        m_no: req.params.id,
    }).then((result) => {
        const response = {
            uid: result.uid,
			m_no: result.m_no,
            nickname: result.nickname,
            email: result.email,
			addr: result.addr,
			addr1: result.addr1,
            createdAt: result.createdAt,
        };
        res.status(200).send({status: 200, result: response, message: "success"});
    }).catch((err) => {
        res.status(500).json({status: 500, message: err.message});
    });
};

/**********************
 * Developer : Corner
 * Description : 계정 닉네임 중복체크, nickname
 **********************/
exports.dupCheckNick = async (req, res) => {
	if (emptyJson(req.body.constructor) === true) {
		info.message = "JSON 형식의 데이터를 입력해주세요.";
		return res.status(200).json({
			status: 400,
			info
		});
	}

	if (emptyProperty(req.body, 'nickname') === true) {
		info.message = "닉네임을 입력해주세요.";
		return res.status(200).json({
			status: 401,
			info
		});
	}
	const nickname = req.body.nickname;

	await Member.findOne({
		nickname
	}).then((result) => {
		if (result.nickname === nickname) {
			info.type = false
			info.message = "존재하는 계정"
			return res.status(200).json({status: 201, info});
		}
		info.type = true
		info.message = "사용가능"
		return res.status(200).json({status: 200, info});
	}).catch((err) => {
		res.status(500).json({status: 500, message: err.message});
	});
}

/**********************
 * Developer : Corner
 * Description : 계정 이메일 중복체크, email
 **********************/
exports.dupCheckEmail = async (req, res) => {

	if (emptyJson(req.body.constructor) === true) {
		info.message = "JSON 형식의 데이터를 입력해주세요.";
		return res.status(200).json({
			status: 400,
			info
		});
	}

	if (emptyProperty(req.body, 'email') === true) {
		info.message = "이메일을 입력해주세요.";
		return res.status(200).json({
			status: 400,
			info
		});
	}

	const email = req.body.email;

	return await Member.findOne({
		where: {
			email: email
		}
	}).then((result) => {
		if (result.email === email) {
			info.type = false
			info.message = "존재하는 계정"
			return res.status(200).json({status: 201, info});
		}
		info.type = true
		info.message = "사용가능"
		return res.status(200).json({status: 200, info});
	}).catch((err) => {
		return res.status(500).json({status: 500, message: err.message});
	});
}
/***********************************
 * Developer: corner
 * Description: Salt 암호화,
 *              salt 값을 구할 때와 해시 값을 구할 때, 작업이 끝날때까지 기다려 주어야 하므로 [동기 방식]으로 사용합니다.
 ************************************/
crypto.randomBytes(64, (err, salt) => {
    crypto.pbkdf2('password', salt.toString('base64'), 100000, 64, 'sha512', (err, key) => {
        console.log(key.toString('base64'));
    });
});
/*********************************
 * Developer: corner
 * Description: 계정 생성
 *********************************/
exports.create = async (req, res) => {

	if (emptyJson(req.body.constructor) === true) {
		info.message = "JSON 형식의 데이터를 입력해주세요.";
		return res.status(200).json({
			status: 400,
			info
		});
	}

	let body = req.body;
	for (let key in body) {
		if (emptyProperty(body, key) === true) {
			console.log(emptyProperty(body, key))
			console.log(body[key])
			info.message = `${key}가 잘못되었습니다.`;
			return res.status(200).json({
				status: 400,
				info
			});
		}
	}

    let password = req.body.password;
    let uid = req.body.email;

    crypto.createHash('sha512').update(password).digest('base64');
    password = crypto.createHash('sha512').update(password).digest('hex');

    crypto.createHash('sha512').update(uid).digest('base64');
    uid = crypto.createHash('sha512').update(uid).digest('hex');

    const {nickname, email, addr, addr1, birthday} = body;

    await Member.create({uid, nickname, email, password, addr, addr1, birthday}).then((result) => {
		info.type = true;
		info.message = "success";
        result = {
            "m_no": result.m_no, // 회원 번호
            "nickname": result.nickname, // 회원 닉네임
            "email": result.email, // 회원 이메일
            "addr": result.addr, // 회원 주소
            "addr1": result.addr1, // 회원 주소
			"birthday": result.birthday, // 회원 생년월일
            "createdAt": result.createdAt, // 회원 생성일
        }
        let data = {status:200, data: {result}, info}
        return res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send({status: 500, message: err.message});
    });
};

/***********************
 * Developer : Corner
 * Description : 계정 정보 수정
 ***********************/
exports.update = async (req, res) => {
	if (emptyJson(req.body.constructor) === true) {
		info.message = "JSON 형식의 데이터를 입력해주세요.";
		return res.status(200).json({
			status: 400,
			info
		});
	}

	let body = req.body;

	for (let key in body) {
		if (emptyProperty(body, key) === true) {
			info.message = `${key}가 잘못되었습니다.`;
			return res.status(200).json({
				status: 400,
				info
			});
		}
	}

	const { nickname, addr, addr1 } = body;
	const m_no = req.params.id;

	await Member.update( {nickname, addr, addr1}, { where: { m_no } } ).then((result) => {
		console.log(result)
		if (result) {
			info.type = true;
			info.message = 'success';
			return res.status(200).json({
				status: 200,
				info
			});
		} else {
			info.type = false;
			info.message = '정보 수정에 실패하였습니다.';
			return res.status(200).json({
				status: 401,
				info
			});
		}
	}).catch((err) => {
		console.log(err);
		return res.status(500).send({status: 500, message: err.message});
	})

}

/************************
 * Developer : Corner
 * Description : 계정 정보 삭제
 * ************************/
exports.delete = async (req, res, next) => {
	const m_no = req.params.id;
	if (!m_no) {
		info.type = false;
		info.message = '계정 정보를 삭제하는데 실패하였습니다.';
		res.status(400).json({
			status: 400,
			info
		});
	}

	Member.destroy({ where: { m_no } }).then((result) => {
		if (result == 1) {
			info.type = true;
			info.message = 'success';
			return res.status(200).json({
				status: 200,
				info
			});
		} else {
			info.type = false;
			info.message = '계정 정보를 삭제하는데 실패하였습니다.';
			res.status(400).json({
				status: 400,
				info
			});
		}
	});


}
