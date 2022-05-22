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
    if(!req.body) {
        res.status(400).send({
           message: "Error: Body(JSON)값이 비어있습니다."
        });
    }
    const send_tags = [];
    if (req.body.tags) {
        this.tag_create(req.body.tags);
    }
    console.log(send_tags);
    
    const {name, nickname, email, password, address} = req.body;
    await Member.create({
        name, nickname, email, password, address
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

// 태그 생성 (INSERT)
exports.tag_create = async (tag) => {
    console.log(tag);
    if(tag) {
       return false;
    }
    let tag1 = '', tag2 = '', tag3 = '', tag4 = '', tag5 = '';
    tag.forEach((value, idx) => {
        console.log(value, idx);
    })
    
    await Tags.create({
    
    })
};
