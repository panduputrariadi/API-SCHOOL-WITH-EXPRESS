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
            as: 'assessment',
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

  async delete(req, res) {
    try {
      const assignmentId = req.params.id;
      await model.assignmentAssessment.destroy({
        where: {
          assignmentsId: assignmentId
        }
      });
  
      // Delete assignment
      await model.assignment.destroy({
        where: {
          id: assignmentId
        }
      });
  
      res.status(200).json({
        message: "Success delete Assignment"
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal Server Error"
      });
    }
  }
  
}

module.exports = new AssignmenController();
