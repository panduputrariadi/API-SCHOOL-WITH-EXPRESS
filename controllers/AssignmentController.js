const model = require("../models/index");
const Validator = require("fastest-validator");
const validated = new Validator();

class AssignmenController {
  async getAll(req, res) {
    try {
      const assignment = await model.assignment.findAll({
        include: [
          {
            model: model.subject,
            as: "subject",
          },
          {
            model: model.assignmentAssessment,
            as: 'studentsAssignment',
            through: []
          }
        ],
      });
      if (assignment.length > 0) {
        res.status(200).json({
          message: "GET METHOD ASSIGNMENT",
          data: assignment,
        });
      } else {
        res.status(404).json({
          message: "GET METHOD ASSIGNMENT",
          data: [],
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

module.exports = new AssignmenController();
