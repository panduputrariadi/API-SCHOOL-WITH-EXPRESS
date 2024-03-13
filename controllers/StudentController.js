const model = require('../models/index');
const Validator = require('fastest-validator');
const validated = new Validator();

class StudentController {
  async getAll(req, res) {
    try {
      const students = await model.student.findAll({
        include: [
          {
            model: model.department,
            as: 'department'
          },
          {
            model: model.subject,
            as: 'subjects',
            through: []
          }
        ]
      });

      if (students.length > 0) {
        res.status(200).json({
          message: "GET METHOD STUDENT",
          data: students
        });
      } else {
        res.status(404).json({
          message: 'GET METHOD STUDENT',
          data: []
        });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({
        message: error.message || "An error occurred",
      });
    }
  }

  async getById(req, res) {
    try {
      const student = await model.student.findOne({
        where: {
          id: req.params.id
        },
        include: [
          {
            model: model.department,
            as: 'department'
          },
          {
            model: model.subject,
            as: 'subjects',
            through: []
          }
        ]
      });

      if (student) {
        res.status(200).json({
          message: "DATA SUBJECT FOUND",
          data: student
        });
      } else {
        res.status(404).json({
          message: "DATA NOT FOUND"
        });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({
        message: error.message || "An error occurred",
      });
    }
  }

  async post(req, res) {
    try {
      const schema = {
        name: "string|required",
        address: "string|required",
        dob: "string|required",
        departmentsId: {
          type: "number",
          ref: "departments"
        },
        subjects: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number" }
            }
          }
        }
      };

      const validate = validated.validate(req.body, schema);
      if (validate.length) {
        return res.status(400).json(validate);
      }

      let student = await model.student.create(req.body);

      await Promise.all(req.body.subjects.map(async (subject) => {
        await model.studentSubject.create({
          studentsId: student.id,
          subjectsId: subject.id
        });
      }));

      student = await model.student.findOne({
        where: { id: student.id },
        include: [{ model: model.subject, as: "subjects" }]
      });

      res.status(201).json({
        message: "SUCCESS CREATED STUDENT",
        data: student
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        message: error.message || "An error occurred",
      });
    }
  }

  async update(req, res) {
    try {
      let id = req.params.id;
      let student = await model.student.findByPk(id);

      if (!student) {
        res.status(404).json({
          message: "STUDENT NOT FOUND"
        });
      }

      const schema = {
        name: "string|nullable",
        address: "string|nullable",
        dob: "string|nullable",
        departmentsId: {
          type: "number",
          ref: "departments"
        }
      };

      const validate = validated.validate(req.body, schema);
      if (validate.length) {
        res.status(400).json(validate);
      }

      student = await student.update(req.body);
      res.status(201).json({
        message: "SUCCESS UPDATED STUDENT",
        data: student
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        message: error.message || "An error occurred",
      });
    }
  }

  async delete(req, res) {
    try {
      let student = await model.student.destroy({
        where: {
          id: req.params.id
        }
      });

      if (student) {
        res.status(200).json({
          message: "SUCCESS DELETE STUDENT"
        });
      } else {
        res.status(400).json({
          message: "DATA NOT FOUND"
        });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({
        message: error.message || "An error occurred",
      });
    }
  }
}

module.exports = new StudentController();
