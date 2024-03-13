var express = require('express');
var router = express.Router();
const controller = require('../controllers/index');

//artinya menuju ke konstanta controller di atas, menuju ke kontanta department, menuju ke file controller department metho getAll
router.get('/', controller.department.getAll);
router.get('/:id', controller.department.getById);
router.post('/', controller.department.post);
router.put('/:id', controller.department.update);
router.delete('/:id', controller.department.delete);

module.exports = router;