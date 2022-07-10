const express = require('express');
const router = express.Router();
const controller = require('../controller/auth.controller.js');
const auth = require('../middleware/auth');
const refresh = require("../middleware/refresh");


/**********************
 * Developer : corner
 * Description : 로그인
 ***********************/
router.post('/auth', controller.login);

// 인증 사용
router.use('/auth', auth.verifyToken);
// 유저 체크
router.get('/auth', controller.check);
router.get('/refresh', refresh)


module.exports = router;
