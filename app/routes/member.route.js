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
 *  /member:
 *    get:
 *      summary: "유저 데이터 전체조회"
 *      description: "모든 유저 데이터 조회"
 *      tags: [Member]
 *      responses:
 *        "200":
 *          description: 조회 성공
 */
// 유저 단일 조회
router.get("/member/:id", controller.findOne);
/**
 * @swagger
 * paths:
 *  /member/:id:
 *    get:
 *      summary: "유저 데이터 전체조회"
 *      description: "단일 유저 데이터 조회"
 *      tags: [Member]
 *      parameters:
 *        - in: params
 *          name: m_no
 *          description: 유저 번호
 *          required: true
 *      responses:
 *       200:
 *        description: '[ "status": 200, "result": { "m_no": 1, "nickname": "기훈쨩", "email": "corner@gmail.com", "createdAt": "2022-05-28T16:49:46.000Z" }, "message": "success" ]'
 *        schema:
 */
// 중복 체크
router.post("/member/name", controller.dupCheckId)
router.post("/member/email", controller.dupCheckEmail)


// 유저 생성
router.post("/member", controller.create);
/**
 * @swagger
 * paths:
 *  /member:
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
 *         description: 회원가입 성공
 *         content:
 *           application:json
 *       "400":
 *         description: 잘못된 파라미터 전달
 *
 */



module.exports = router;
