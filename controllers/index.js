const DepartmentController = require('./DepartmentController');
const SubjectController = require('./SubjectController');
const StudentController = require('./StudentController');
const StudentSubjectController = require('./StudentSubjectController');
const AssignmenController = require('./AssignmentController');
const AssignmentAssessmentController = require('./AssignmentAssessmentController');
const AuthController = require("./AuthenticationController")

const controllers = {
  department: DepartmentController,
  subject: SubjectController,
  student: StudentController,
  studentSubject: StudentSubjectController,
  assignment: AssignmenController,
  assignmentAssessment: AssignmentAssessmentController,
  auth: AuthController
};

module.exports = controllers;
