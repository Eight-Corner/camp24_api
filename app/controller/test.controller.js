const db = require("../models")
const Members = db.Member;
const Op = db.Sequelize.Op;

// 전체 조회
exports.findAll = async (req, res) => {
    await Members.findAll({
        limit: 10,
    } ).then((data) => {
        console.log(data);
        res.status(200).send({
            status: 200,
            result: data,
            message: "",
        });
    }).catch(err => {
        return res.status(400).json({status: 400, message: err.message});
    });
}

/*******************
* Developer : corner
 * Description : 계정 생성
*********************/

exports.create = async (req, res) => {
    const body = req.body;
    if(!req.body){
        res.status(400).send({
            message: "값이 없습니다."
        });
    }
    const {name, email, phone_number} = body;
    console.log(body);
    await Members.create({
        name, email, phone_number
    }).then((data) => {
       console.log("계정 생성 결과 :  " + data);
       return res.status(200).send({
           status: 200,
           result: data,
           message: "",
       });
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: 400, message: err.message});
    });
}
