const db = require("../models");
const Member = db.Member;
const Tags = db.Tags;

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

// 유저 생성
exports.create = async (req, res) => {
    console.log("req--------------------", req.body);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            message: "Error: Body(JSON)값이 비어있습니다."
        });
    }
    const {name, nickname, email, password, address} = req.body;
    await Member.create({
        name, nickname, email, password, address
    }).then((result) => {
        // TODO :: result 값에서 password를 제외
        console.log("결과 ::: " + result);
        
        if (Array.isArray(req.body.tags) && req.body.tags.length > 0) {
            const tag_body = req.body.tags;
            tag_body.forEach((value, index, obj) => {
                console.log("반복1111", value, index, obj)
                this.tag_create(value, result.m_no)
               // this.tag_create(value, result.m_no).then((tag_res) => {
               //      if (tag_res !== true) {
               //          return res.status(200).send({status: 502, message: "태그를 생성할 수 없습니다.", result: false});
               //      }
               //  });
            });
            return res.status(200).send({
                status: 200,
                result: result, tag_result: tag_body,
                message: "success"
            });
        } else {
            return res.status(200).send({status: 200, message: "", result: result});
        }
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
