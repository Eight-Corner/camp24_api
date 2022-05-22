const express = require('express');
const router = express.Router();
const controller = require('../controller/member.controller.js');

router.get("/member", controller.findAll)

module.exports = router;
