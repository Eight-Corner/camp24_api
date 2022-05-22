const customers = require("../controller/customer.controller");
const test_member = require("../controller/test.controller");
module.exports = app =>{
    const customers = require("../controller/customer.controller.js");
    const test_member = require("../controller/test.controller.js");
    
    // 튜플 생성
    app.post("/customers", customers.create);
    
    // 전체 조회
    app.get("/customers", customers.findAll);
    
    // id로 조회
    app.get("/customers/:customerId", customers.findOne);
    
    // id로 수정
    app.put("/customers/:customerId", customers.update);
    
    // id로 삭제
    app.delete("/customers/:customerId", customers.delete);
    
    // 전체 삭제
    app.delete("/customers", customers.deleteAll);
    
    
    
    // 전체 조회
    app.get("/test", test_member.findAll);
    
    // 계정 생성
    app.post("/test", test_member.create);
    
    
};
