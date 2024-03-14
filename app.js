require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var FileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var departmentRouter = require('./routes/departmentsRoutes');
var subjectRouter = require('./routes/subjectsRoutes');
var studentRouter = require('./routes/studentsRoutes');
var studentSubjectRouter = require('./routes/studentSubjectRoutes');
var assignmentRouter = require('./routes/assignmentsRoutes');
var assigmentAssessmentRouter = require('./routes/assignmentAssessmentRoute');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(FileUpload());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/departments', departmentRouter);
app.use('/subjects', subjectRouter);
app.use('/students', studentRouter);
app.use('/studentSubject', studentSubjectRouter);
app.use('/assignments', assignmentRouter);
app.use('/assignmentAssessment', assigmentAssessmentRouter);

module.exports = app;
