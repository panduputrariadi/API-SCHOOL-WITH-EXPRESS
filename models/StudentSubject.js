module.exports = (sequelize,DataTypes) => {
    const studentSubject = sequelize.define(
        "studentSubject", {
            id : {
                type: DataTypes.INTEGER,
                primaryKey : true,
                allowNull: false,
                autoIncrement: true
            },
            studentsId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "student",
                    key: "id"
                }
            },
            subjectsId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "subject",
                    key: "id"
                }
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false
            }
        }, {
            tableName: "studentSubjects"
        }
    );

    studentSubject.associate = function (models){
        studentSubject.belongsTo(models.student, {
            foreignKey: 'studentsId',
            as: 'student'
        });
        studentSubject.belongsTo(models.subject, {
            foreignKey: 'subjectsId',
            as: 'subject'
        });
    }

    return studentSubject;
}