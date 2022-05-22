module.exports = app =>{
    const customers = require("../controller/customer.controller.js");
    
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
    
};
