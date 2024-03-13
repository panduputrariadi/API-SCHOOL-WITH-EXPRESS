const model = require('../models/index');

class StudentSubjectController {
    async getAll(req, res){
        try {
            const studentSubject = await model.studentSubject.findAll({
                include: [
                    {
                        model: model.student,
                        as: 'student'
                    },
                    {
                        model: model.subject,
                        as: 'subject'
                    }
                ]
            });

            if(studentSubject.length > 0){
                res.status(200).json({
                    message: "GET METHOD STUDENT SUBJECT",
                    data: studentSubject
                });
            } else{
                res.status(404).json({
                    message: "DATA NOT FOUND",
                    data: []
                });
            }
        } catch (error) {
            console.error(error);
            res.status(400).json({
                message: error.message || "An error occured"
            });
        }
    }

    async getById(req,res){
        try {
            const studentSubject = await model.studentSubject.findOne({
                where: {
                    id: req.params.id
                },
                include: [
                    {
                        model: model.student,
                        as: 'student'
                    },
                    {
                        model: model.subject,
                        as: 'subject'
                    }
                ]
            });

            if(studentSubject){
                res.status(200).json({
                    message: "DATA FOUND",
                    data: studentSubject
                });
            } else{
                res.status(404).json({
                    message:"DATA NOT FOUND"
                });
            }
        } catch (error) {
            console.error(error);
            res.status(400).json({
                message: error.message || "An error occured"
            });
        }
    }
}

module.exports = new StudentSubjectController();