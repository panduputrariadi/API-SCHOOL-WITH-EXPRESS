'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('students', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.DATE
      },
      departmentsId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'departments',
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
    }, {
      timestamp: true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('students', 'departmentsId');
    await queryInterface.dropTable('students');
  }
};
