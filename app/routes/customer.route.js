const express = require('express');
const router = express.Router();
const controller = require('../controller/customer.controller.js');

    // 튜플 생성
    router.post("/customers", controller.create);
    
    // 전체 조회
    router.get("/customers", controller.findAll);
    
    // id로 조회
    router.get("/customers/:customerId", controller.findOne);
    
    // id로 수정
    router.put("/customers/:customerId", controller.update);
    
    // id로 삭제
    router.delete("/customers/:customerId", controller.delete);
    
    // 전체 삭제
    router.delete("/customers", controller.deleteAll);

    
module.exports = router;
