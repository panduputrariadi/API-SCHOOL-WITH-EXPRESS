module.exports = (sequelize, DataTypes) => {
    const department = sequelize.define('department', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      departmentName: {
        type: DataTypes.STRING
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    }, {
      tableName: "departments"
    });

    department.associate = function(models){
      department.hasMany(models.subject, {
        foreignKey: 'departmentsId',
        as: 'subjects'
      });
      department.hasMany(models.student, {
        foreignKey: 'departmentsId',
        as: 'students'
      });
    }     
  
    return department;
  };
