var express = require('express');
var router = express.Router();
const controller = require('../controllers/index');

router.get('/', controller.subject.getAll);
router.get('/:id', controller.subject.getById);
router.post('/', controller.subject.post);
router.put('/:id', controller.subject.update);
router.delete('/:id', controller.subject.delete);

module.exports = router;