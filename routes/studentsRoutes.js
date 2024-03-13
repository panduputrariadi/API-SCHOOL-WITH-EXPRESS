var express = require('express');
var router = express.Router();
const controller = require('../controllers/index');

router.get('/', controller.student.getAll);
router.get('/:id', controller.student.getById);
router.post('/', controller.student.post);
router.put('/:id', controller.student.update);
router.delete('/:id', controller.student.delete);

module.exports = router;