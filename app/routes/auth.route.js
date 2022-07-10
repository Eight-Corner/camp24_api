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

/* access token을 재발급 하기 위한 router.
  클라이언트는 access token과 refresh token을 둘 다 헤더에 담아서 요청해야합니다. */
router.get('/refresh', refresh);


module.exports = router;
