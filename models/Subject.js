module.exports = (sequelize, DataTypes) => {
  const subject = sequelize.define(
    "subject",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      subjectName: {
        type: DataTypes.STRING,
      },
      alreadyFilled: {
        type: DataTypes.INTEGER,
      },
      maximumFilled: {
        type: DataTypes.INTEGER,
      },
      startAt: {
        type: DataTypes.TIME,
      },
      endAt: {
        type: DataTypes.TIME,
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
      tableName: "subjects",
    }
  );

  subject.associate = function (models) {
    subject.belongsTo(models.department, {
      foreignKey: "departmentsId",
      as: "department",
    });
    subject.belongsToMany(models.student, {
      through: "studentSubject",
      foreignKey: "subjectsId",
      otherKey: "studentsId",
      as: "students",
    });

    // subject.hasMany(models.student, {
    //   //pada bagian ini harusnya memakai subjectsId dikarenakan pada tabel students memiliki kolom subjectsId
    //   foreignKey: "subjectsId",
    //   as: "student",
    // });
  };

  return subject;
};
