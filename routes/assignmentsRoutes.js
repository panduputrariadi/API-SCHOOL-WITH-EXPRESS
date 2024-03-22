var express = require('express');
var router = express.Router();
const controller = require('../controllers/index');

router.get('/', controller.assignment.getAll);
router.delete('/:id', controller.assignment.delete);

module.exports = router;