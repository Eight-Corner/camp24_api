const Customer = require("../models/customer.model.js");

// 새 객체 생성
exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    
    const customer = new Customer({
        email: req.body.email,
        name: req.body.name,
        active: req.body.active
    });
    
    // 데이터베이스에 저장
    Customer.create(customer, (err, data) =>{
        if(err){
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating th Customer."
            });
        }
    })
};

// 전체 조회
exports.findAll = (req,res)=>{
    console.log("-----")
    Customer.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};

// id로 조회
exports.findOne = (req,res)=>{
    Customer.findById(req.params.customerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.customerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.params.customerId
                });
            }
        } else res.send(data);
    });
};

// id로 갱신
exports.update = (req,res)=>{
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    
    Customer.updateById(
        req.params.customerId,
        new Customer(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Customer with id ${req.params.customerId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Customer with id " + req.params.customerId
                    });
                }
            } else res.send(data);
        }
    );
};

// id로 삭제
exports.delete = (req,res)=>{
    Customer.remove(req.params.customerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.customerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Customer with id " + req.params.customerId
                });
            }
        } else res.send({ message: `Customer was deleted successfully!` });
    });
};

// 전체 삭제
exports.deleteAll = (req,res)=>{
    Customer.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all customers."
            });
        else res.send({ message: `All Customers were deleted successfully!` });
    });
};
