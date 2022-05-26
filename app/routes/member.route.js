const express = require('express');
const router = express.Router();
const controller = require('../controller/member.controller.js');

/*********************
 * Developer : corner
 * Description : 멤버 관련 라우터
 * *******************/
// 유저 전체 조회
router.get("/member", controller.findAll);
/**
 * @swagger
 * paths:
 *  /api/member:
 *    get:
 *      summary: "유저 데이터 전체조회"
 *      description: "모든 유저 데이터 조회"
 *      tags: [Member]
 *      responses:
 *        "200":
 *          description: 전체 유저 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    ok:
 *                      type: boolean
 *                    users:
 *                      type: object
 *                      example:
 *                          [
 *                            { "id": 1, "name": "유저1" },
 *                            { "id": 2, "name": "유저2" },
 *                            { "id": 3, "name": "유저3" },
 *                          ]
 */
// 유저 생성
router.post("/member", controller.create);
/**
 * @swagger
 * paths:
 *  /api/member:
 *   post:
 *     tags: [Member]
 *     summary: 회원가입 계정
 *     parameters:
 *       - name:
 *         in: Post
 *         type: string
 *         description: 회원가입 정보(아이디),
 *       - name:
 *          tags: [Member]
 *          summary: 회원가입 계정
 *     responses:
 *       "200":
 *
 *         description: 회원가입 성공
 *         content:
 *           application:json
 *       "400":
 *         description: 잘못된 파라메타 전달
 *
 */



module.exports = router;
