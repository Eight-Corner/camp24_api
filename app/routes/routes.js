const express = require('express');
const router = express.Router();

const member = require('./member.route.js');
const auth = require('./auth.route.js');

router.use('/api/v1/member', member);
router.use('/api/v1', auth);

module.exports = router;
