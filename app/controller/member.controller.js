const db = require("../models");
const Member = db.Member;

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

// 유저 생성
exports.create = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
           message: "Error: Body(JSON)값이 비어있습니다."
        });
    }
    const send_tags = [];
    if (req.body.tags) {
        for (const req_tags of req.body.tags) {
            send_tags.push(req_tags);
        }
    }
    console.log(send_tags);
    const {name, nickname, email, password, address} = req.body;
    await Member.create({
        name, nickname, email, password, address, send_tags
    }).then((result) => {
        // TODO :: result 값에서 password를 제외
        // TODO :: DB에 Tag 테이블을 정의하고 FK로 연결시킨 뒤 매핑시켜서 가져와야 할 듯.
        console.log("결과 ::: " + result);
        return res.status(200).send({
            status: 200,
            result: result,
            message: "success",
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: 500, message: err.message});
    });
};
