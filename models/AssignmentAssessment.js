module.exports = (sequelize, DataTypes) => {
    const assigmentAssessment = sequelize.define(
      "assignmentAssessment",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        studentId: {
          type: DataTypes.INTEGER,
          references: {
            model: "student",
            key: "id"
          }
        },
        assignmentsId: {
          type: DataTypes.INTEGER,
          references: {
            model: "assignment",
            key: "id"
          }
        },
        file: {
            type: DataTypes.STRING,
        },
        url: {
            type: DataTypes.STRING,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        tableName: "assignmentAssesments",
      }
    );
  
    assigmentAssessment.associate = function (models) {
      assigmentAssessment.belongsTo(models.student, {
        foreignKey: "studentId",
        as: "student",
      });
      assigmentAssessment.associate = function (models) {
        assigmentAssessment.belongsTo(models.assignment, {
          foreignKey: "assignmentsId",
          as: "assignment"
        });
      };      
      
    };
  
    return assigmentAssessment;
  };
  