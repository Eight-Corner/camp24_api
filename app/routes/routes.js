const express = require('express');
const router = express.Router();

const member = require('./member.route.js');

router.use('/api', member);

const customer = require('./customer.route.js');
router.use('/api', customer);


module.exports = router;
