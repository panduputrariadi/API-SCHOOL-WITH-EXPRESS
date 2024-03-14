var express = require('express');
var router = express.Router();
const controller = require('../controllers/index');

router.get('/', controller.assignmentAssessment.getAll);
router.post('/', controller.assignmentAssessment.post);

module.exports = router;