var express = require('express');
var router = express.Router();
const controller = require('../controllers/index');

router.get('/', controller.assignmentAssessment.getAll);
router.post('/', controller.assignmentAssessment.post);
router.put('/:id', controller.assignmentAssessment.update)

module.exports = router;