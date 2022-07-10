const express = require('express');
const router = express.Router();
const controller = require('../controller/member.controller.js');

/*********************
 * Developer : corner
 * Description : 멤버 관련 라우터
 * *******************/
// 유저 전체 조회
router.get("/member", controller.findAll);
// 유저 단일 조회
router.get("/member/:id", controller.findOne);
// 중복 체크
router.post("/member/nick", controller.dupCheckNick)
router.post("/member/email", controller.dupCheckEmail)

// 유저 생성
router.post("/member", controller.create);




module.exports = router;
