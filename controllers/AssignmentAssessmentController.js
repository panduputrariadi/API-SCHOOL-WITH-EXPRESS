const path = require("path");
const model = require("../models/index");
const Validator = require("fastest-validator");
const validated = new Validator();
const fs = require("fs");

class AssignmentAssessmentController {
  async getAll(req, res) {
    try {
      const assignmentAssessments = await model.assignmentAssessment.findAll({
        include: [
          {
            model: model.student,
            as: "student",
          },
        ],
      });

      if (assignmentAssessments.length > 0) {
        res.status(200).json({
          message: "GET METHOD ASSIGNMENT ASSESSMENT",
          data: assignmentAssessments,
        });
      } else {
        res.status(404).json({
          message: "DATA NOT FOUND",
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

  async post(req, res) {
    try {
      const { studentId, assignmentsId } = req.body;
      const hasSubject = await model.studentSubject.findOne({
        where: { studentsId: studentId, subjectsId: assignmentsId },
      });

      if (!hasSubject) {
        return res.status(403).json({ msg: "You are not allowed to upload for this assignment because your are not taking this subject" });
      }

      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: "No File Uploaded" });
      }

      const file = req.files.file;
      const fileSize = file.size;
      const ext = path.extname(file.name);
      const allowedTypes = [".png", ".jpg", ".jpeg", ".pdf"];
      const fileName = `${file.md5}${ext}`;

      const schema = {
        studentId: { type: "string", positive: true, required: true },
        assignmentsId: { type: "string", positive: true, required: true },
      };

      const validation = validated.validate(req.body, schema);
      if (validation !== true) {
        return res.status(400).json({ errors: validation });
      }

      if (!allowedTypes.includes(ext.toLowerCase())) {
        return res.status(422).json({
          msg:
            "Invalid file format. Supported formats: " +
            allowedTypes.join(", "),
        });
      }

      if (fileSize > 5000000) {
        return res.status(422).json({
          msg: "File size exceeds the limit. Maximum file size is 5MB.",
        });
      }

      file.mv(`./public/assignment/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
          const url = `${req.protocol}://${req.get(
            "host"
          )}/assignment/${fileName}`;
          await model.assignmentAssessment.create({
            studentId: req.body.studentId,
            assignmentsId: req.body.assignmentsId,
            file: fileName,
            url: url,
            status: "already filled assignment",
          });
          res
            .status(201)
            .json({ msg: "Assignment uploaded successfully", fileName, url });
        } catch (error) {
          console.error(error.message);
          res.status(500).json({ msg: "Internal Server Error" });
        }
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
      let assignmentAssessment = await model.assignmentAssessment.findByPk(id);

      if (!assignmentAssessment) {
        res.status(404).json({
          message: "Assignment Assessment Not Found",
        });
      }

      const { studentId, assignmentsId } = req.body;
      const hasSubject = await model.studentSubject.findOne({
        where: { studentsId: studentId, subjectsId: assignmentsId },
      });

      if (!hasSubject) {
        return res.status(403).json({ msg: "You are not allowed to upload for this assignment because your are not taking this subject" });
      }

      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: "No File Uploaded" });
      }

      const file = req.files.file;
      const fileSize = file.size;
      const ext = path.extname(file.name);
      const allowedTypes = [".png", ".jpg", ".jpeg", ".pdf"];
      const fileName = `${file.md5}${ext}`;

      const schema = {
        studentId: { type: "string", positive: true, required: false },
        assignmentsId: { type: "string", positive: true, required: false },
      };

      const validation = validated.validate(req.body, schema);
      if (validation !== true) {
        return res.status(400).json({ errors: validation });
      }

      if (!allowedTypes.includes(ext.toLowerCase())) {
        return res.status(422).json({
          msg:
            "Invalid file format. Supported formats: " +
            allowedTypes.join(", "),
        });
      }

      if (fileSize > 5000000) {
        return res.status(422).json({
          msg: "File size exceeds the limit. Maximum file size is 5MB.",
        });
      }

      const oldAssignment = await model.assignmentAssessment.findByPk(id);

      if (!oldAssignment) {
        return res.status(404).json({ msg: "Assignment not found" });
      }

      const oldFilePath = `./public/assignment/${oldAssignment.file}`;
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath); // Menghapus file lama
      }

      file.mv(`./public/assignment/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
          const url = `${req.protocol}://${req.get(
            "host"
          )}/assignment/${fileName}`;
          await model.assignmentAssessment.update(
            { file: fileName, url: url, status: "already filled assignment" },
            { where: { id: id } }
          );
          res
            .status(200)
            .json({ msg: "Assignment updated successfully", fileName, url });
        } catch (error) {
          console.error(error.message);
          res.status(500).json({ msg: "Internal Server Error" });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        message: error.message || "An error occurred",
      });
    }
  }
}

module.exports = new AssignmentAssessmentController();
