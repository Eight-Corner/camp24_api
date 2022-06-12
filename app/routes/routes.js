const express = require('express');
const router = express.Router();

const member = require('./member.route.js');

router.use('/api', member);

module.exports = router;
