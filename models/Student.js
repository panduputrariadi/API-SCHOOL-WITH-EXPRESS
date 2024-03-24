module.exports = (sequelize, DataTypes) => {
  const student = sequelize.define(
    "student",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      dob: {
        type: DataTypes.DATE,
      },
      departmentsId: {
        type: DataTypes.INTEGER,
        references: {
          model: "departments",
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
      tableName: "students",
    }
  );

  student.associate = function (models) {
    student.belongsTo(models.department, {
      foreignKey: "departmentsId",
      as: "department",
    });
    student.belongsToMany(models.subject, {
      through: "studentSubject",
      foreignKey: "studentsId",
      otherKey: "subjectsId",
      as: "subjects",
    });
  };

  return student;
};
