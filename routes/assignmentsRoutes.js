var express = require('express');
var router = express.Router();
const controller = require('../controllers/index');

router.get('/', controller.assignment.getAll);

module.exports = router;