const express = require('express');
const router = express.Router();
const controller = require('../controller/member.controller.js');

const auth = require("../middleware/auth");
/*********************
 * Developer : corner
 * Description : 멤버 관련 라우터
 * *******************/

// 유저 전체 조회
router.get("/", auth.verifyToken, controller.findAll);
// 유저 단일 조회
router.get("/:id", auth.verifyToken, controller.findOne);
// 중복 체크
router.post("/nick", controller.dupCheckNick)
router.post("/email", controller.dupCheckEmail)

// 유저 생성
router.post("/", controller.create);




module.exports = router;
