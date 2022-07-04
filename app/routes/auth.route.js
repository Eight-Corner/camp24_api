const express = require('express');
const router = express.Router();
const controller = require('../controller/auth.controller.js');
const auth = require('../middleware/auth');


/**********************
 * Developer : corner
 * Description : 로그인
 ***********************/
router.post('/auth', controller.login);
/**
 * @swagger
 * paths:
 *  /auth:
 *   post:
 *     tags: [Member]
 *     summary: 로그인
 *     description: email / password로 로그인
 *     parameters:
 *       - name:
 *         in: Post
 *         type: string
 *       - name:
 *         in: Post
 *         type: string
 *     responses:
 *       "200":
 *         description: 로그인 성공
 *
 */
router.use('/auth', auth.verifyToken);
router.get('/auth', controller.check);


module.exports = router;
