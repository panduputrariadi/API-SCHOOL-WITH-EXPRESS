var express = require('express');
var router = express.Router();
const controller = require('../controllers/index');

router.post('/', controller.auth.loginUser);

module.exports = router;