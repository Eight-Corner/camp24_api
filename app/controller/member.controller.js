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
    console.log("req--------------------",req.body);
    if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
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
        /*res.status(200).send({
            status: 200,
            result: result,
            message: "success",
        });*/
        if (Array.isArray(req.body.tags) && req.body.tags.length) {
            this.tag_create(req.body.tags, result.m_no).then((res) => {
                console.log("-------------------tag result-", res.result.Tags);
                let tag_result = res.result;
                console.log(tag_result+ "-------------------tag result-");
                return res.status(200).send({
                    status: 200,
                    result: result, tag: tag_result.result,
                    message: "success"
                });
            }).catch((err) => {
                return res.status(500).send({status: 500, message: err.message});
            });
        }
    }).catch((err) => {
        console.log(err);
        return res.status(500).send({status: 500, message: err.message});
    });
};

// 태그 생성 (INSERT)
exports.tag_create = async (tags, res) => {
    const tag = tags.toString();
    let return_type = {};
    return await Tags.create({tag_no: res, tag}).then((result) => {
        console.log("result::::::::",result);
        return_type = {type: true, result: result};
        return return_type;
    }).catch((err) => {
        console.log("err::::::::",err.message);
        return_type = {type: false, result: err.message};
        return return_type;
    });
};
