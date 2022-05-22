const db = require("../models");
const Member = db.Member;

/**********************************
 * Developer : Corner
 * Description : 유저 전체 조회
 **********************************/
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
}
//
