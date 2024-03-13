var express = require('express');
var router = express.Router();
const controller = require('../controllers/index');

router.get('/', controller.studentSubject.getAll);
router.get('/:id', controller.studentSubject.getById);

module.exports = router;