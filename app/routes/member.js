const express = require('express');
const router = express.Router();
const controller = require('../controller/member.controller.js');

/*********************
 * Developer : corner
 * Description : 멤버 관련 라우터
 * *******************/
// 유저 전체 조회
router.get("/member", controller.findAll);
// 유저 생성
router.post("/member", controller.create);



module.exports = router;
