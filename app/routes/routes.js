const express = require('express');
const router = express.Router();

const member = require('./member.route.js');
/**
 * @swagger
 * tags:
 *   name: Member
 *   description: 유저 추가 수정 삭제 조회
 */
router.use('/api', member);

const customer = require('./customer.route.js');
router.use('/api', customer);


module.exports = router;
