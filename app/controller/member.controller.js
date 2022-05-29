const db = require("../models");
const Member = db.Member;
const Tags = db.Tags;
// express-crypto
const crypto = require('crypto');

/**********************************
 * Developer : Corner
 * Description : 유저 관련 컨트롤러
 **********************************/
// 유저 전체 조회
exports.findAll = async (req, res) => {
    await Member.findAll({
        limit: 10,
    }).then((result) => {
        res.status(200).send({
            status: 200,
            result,
            message: "success"
        });
    }).catch((err) => {
        res.status(500).json({status: 500, message: err.message});
    });
};

// 유저 단일 조회
exports.findOne = async (req, res) => {
    await Member.findOne({
        id: req.query.id,
    }).then((result) => {
        res.status(200).send({
            status: 200,
            result,
            message: "success"
        });
    }).catch((err) => {
        res.status(500).json({status: 500, message: err.message});
    });
};


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
/***********************************
 * Developer: corner
 * Description: Salt 암호화 uid,
 ************************************/

/*********************************
 * Developer: corner
 * Description: 계정 생성
 *********************************/
exports.create = async (req, res) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            message: "Error: Body(JSON)값이 비어있습니다."
        });
    }
    // TODO:: UID, Password Crypto
    let password = req.body.password;
    let uid = req.body.email;
    
    crypto.createHash('sha512').update(password).digest('base64');
    password = crypto.createHash('sha512').update(password).digest('hex');
    
    crypto.createHash('sha512').update(uid).digest('base64');
    uid = crypto.createHash('sha512').update(uid).digest('hex');
    console.log(password);
    
    const {nickname, email, address} = req.body;
    await Member.create({uid, nickname, email, password, address}).then((result) => {
        result = {
            "m_no": result.m_no, // 회원 번호
            "nickname": result.nickname, // 회원 닉네임
            "email": result.email, // 회원 이메일
            "address": result.address, // 회원 주소
            "createdAt": result.createdAt, // 회원 생성일
        }
        if (Array.isArray(req.body.tags) && req.body.tags.length > 0) {
            const tag_body = req.body.tags;
            
            tag_body.forEach((value, index, obj) => {
                this.tag_create(value, result.m_no);
            });
            result.tags = tag_body;
            // 계정 생성과 태그 생성
        }
        return res.status(200).send({status: 200, message: "success", result: result});
    }).catch((err) => {
        console.log(err);
        return res.status(500).send({status: 500, message: err.message});
    });
};

// 태그 생성 (INSERT)
exports.tag_create = async (tag, m_no) => {
    return await Tags.create({m_no, tag}).then((result) => {
        console.log("result::::::::", result);
        return true;
    }).catch((err) => {
        console.log("err::::::::", err.message);
        return false;
    });
};
