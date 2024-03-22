module.exports = (sequelize, DataTypes) => {
  const assignment = sequelize.define(
    "assignment",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      caption: {
        type: DataTypes.TEXT,
      },
      dueDate: {
        type: DataTypes.DATE,
      },
      subjectsId: {
        type: DataTypes.INTEGER,
        references: {
          model: "subjects",
          key: "id",
        },
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
      tableName: "assignments",
    }
  );

  assignment.associate = function (models) {
    assignment.belongsTo(models.subject, {
      foreignKey: "subjectsId",
      as: "subject",
    });
    assignment.belongsToMany(models.assignmentAssessment, {
      through: "assignmentAssessment",
      foreignKey: "assignmentsId",
      otherKey: "id",
      as: "assessment"
    });
    
  };

  return assignment;
};
