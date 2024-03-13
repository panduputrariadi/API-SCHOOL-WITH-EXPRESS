const model = require('../models/index');
const Validator = require('fastest-validator');
const validated = new Validator();

class SubjectController {
  async getAll(req, res) {
    try {
      const result = await model.subject.findAll({
        include: [{
          model: model.department,
          as: 'department',
        }]
      });

      if (result.length > 0) {
        res.status(200).json({
          message: 'GET METHOD SUBJECT',
          data: result
        });
      } else {
        res.status(200).json({
          message: 'DATA SUBJECT NOT FOUND',
          data: []
        });
      }
    } catch (error) {
      res.status(404).json({
        message: error
      });
    }
  }

  async getById(req, res) {
    try {
      const subject = await model.subject.findOne({
        where: {
          id: req.params.id
        },
        include: [
          {
            model: model.department,
            as: 'department',
          }
        ]
      });

      if (subject) {
        res.status(200).json({
          message: 'GET METHOD SUBJECT',
          data: subject
        });
      } else {
        res.status(404).json({
          message: 'SUBJECT DATA NOT FOUND'
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }

  async post(req, res, next) {
    try {
      const schema = {
        subjectName: "string|required",
        alreadyFilled: "number|nullable",
        maximumFilled: "number|nullable",
        startAt: "string|required|regex:/^\\d{2}:\\d{2}$/",
        endAt: "string|required|regex:/^\\d{2}:\\d{2}$/",
        departmentsId: {
          type: "number",
          ref: "departments"
        }
      };

      const validate = validated.validate(req.body, schema);
      if (validate.length) {
        return res.status(200).json(validate);
      }

      if (req.body.alreadyFilled > req.body.maximumFilled) {
        return res.status(400).json({
          message: "Cannot create subject capacity because already filled cannot exceed maximum filled"
        });
      }

      if (req.body.alreadyFilled === req.body.maximumFilled) {
        return res.status(400).json({
          message: "Cannot take this subject because alreadyFilled is equal to maximumFilled."
        });
      }

      let subject = await model.subject.create(req.body);
      res.status(201).json({
        message: "SUCCESS CREATED NEW SUBJECT",
        data: subject
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
      let subject = await model.subject.findByPk(id);
      if (!subject) {
        res.status(400).json({
          message: "DATA NOT FOUND"
        });
      }

      const schema = {
        subjectName: "string|nullable",
        alreadyFilled: "number|nullable",
        maximumFilled: "number|nullable",
        startAt: "string|nullable|regex:/^\\d{2}:\\d{2}$/",
        endAt: "string|nullable|regex:/^\\d{2}:\\d{2}$/",
        departmentsId: {
          type: "number",
          ref: "departments"
        }
      };

      const validate = validated.validate(req.body, schema);
      if (validate.length) {
        res.status(400).json(validate);
      }

      if (req.body.alreadyFilled > req.body.maximumFilled) {
        return res.status(400).json({
          message: "Cannot create subject capacity because already filled cannot exceed maximum filled"
        });
      }

      if (req.body.alreadyFilled === req.body.maximumFilled) {
        return res.status(400).json({
          message: "Cannot take this subject because alreadyFilled is equal to maximumFilled."
        });
      }

      subject = await subject.update(req.body);
      res.status(201).json({
        message: "SUCCESS UPDATED SUBJECT",
        data: subject
      });

    } catch (error) {
      // Handle error
      res.status(500).json({
        message: error.message
      });
    }
  }

  async delete(req, res, next) {
    try {
      let subject = await model.subject.destroy({
        where: {
          id: req.params.id
        }
      });
      if (subject) {
        res.status(200).json({
          message: "SUCCESS DELETE SUBJECT"
        });
      } else {
        res.status(400).json({
          message: "DATA NOT FOUND"
        });
      }

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
}

module.exports = new SubjectController();
