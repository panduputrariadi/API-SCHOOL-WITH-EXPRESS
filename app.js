require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var FileUpload = require("express-fileupload");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var departmentRouter = require("./routes/departmentsRoutes");
var subjectRouter = require("./routes/subjectsRoutes");
var studentRouter = require("./routes/studentsRoutes");
var studentSubjectRouter = require("./routes/studentSubjectRoutes");
var assignmentRouter = require("./routes/assignmentsRoutes");
var assigmentAssessmentRouter = require("./routes/assignmentAssessmentRoute");
var authRouter = require("./routes/authenticationRoute")
const { authenticateToken } = require("./middleware/authMiddleware");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(FileUpload());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/login", authRouter);
app.use("/departments", authenticateToken, departmentRouter);
app.use("/subjects", authenticateToken, subjectRouter);
app.use("/students", authenticateToken, studentRouter);
app.use("/studentSubject", authenticateToken, studentSubjectRouter);
app.use("/assignments", authenticateToken, assignmentRouter);
app.use("/assignmentAssessment", authenticateToken, assigmentAssessmentRouter);

module.exports = app;
