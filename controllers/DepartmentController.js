const model = require('../models/index');
const Validator = require('fastest-validator');
const validated = new Validator();

class DepartmentController {
  async getAll(req, res) {
    try {
      const departments = await model.department.findAll({
        include: [
          {
            model: model.subject,
            as: 'subjects',
          },
          {
            model: model.student,
            as: 'students',
          }
        ]
      });

      if (departments.length > 0) {
        res.status(200).json({
          message: 'GET METHOD DEPARTMENT',
          data: departments
        });
      } else {
        res.status(200).json({
          message: 'DEPARTMENT DATA NOT FOUND',
          data: []
        });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        message: 'Internal Server Error'
      });
    }
  }

  async getById(req, res) {
    try {
      const department = await model.department.findOne({
        where: {
          id: req.params.id
        },
        include: [
          {
            model: model.subject,
            as: 'subject',
          }
        ]
      });

      if (department) {
        res.status(200).json({
          message: 'GET METHOD DEPARTMENT',
          data: department
        });
      } else {
        res.status(404).json({
          message: 'DEPARTMENT DATA NOT FOUND'
        });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        message: 'Internal Server Error'
      });
    }
  }

  async post(req, res, next) {
    try {
      const schema = {
        departmentName: "string|required"
      };

      const validate = validated.validate(req.body, schema);
      if (validate.length) {
        return res.status(400).json(validate);
      }

      let department = await model.department.create(req.body);
      res.status(200).json({
        message: "SUCCESS CREATE NEW DEPARTMENT",
        data: department
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }

  async update(req, res, next) {
    try {
      let id = req.params.id;
      let department = await model.department.findByPk(id);
      if (!department) {
        res.status(400).json({
          message: "DATA NOT FOUND"
        });
      }

      const schema = {
        departmentName: "string|nullable"
      };

      const validate = validated.validate(req.body, schema);
      if (validate.length) {
        return res.status(400).json(validate);
      }

      department = await department.update(req.body);
      res.status(200).json({
        message: "SUCCESS UPDATED DEPARTMENTS",
        data: department
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }

  async delete(req, res, next) {
    try {
      let department = await model.department.destroy({
        where: {
          id: req.params.id
        }
      });
      res.status(200).json({
        message: "SUCCESSFULLY DELETE DEPARTMENTS"
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
}

module.exports = new DepartmentController();
