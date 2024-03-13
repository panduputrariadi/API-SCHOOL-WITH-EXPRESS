'use strict';

const id = require('faker/lib/locales/id_ID');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('subjects', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      subjectName: {
        type: Sequelize.STRING
      },
      alreadyFilled: {
        type: Sequelize.INTEGER
      },
      maximumFilled: {
        type: Sequelize.INTEGER
      },
      startAt: {
        type: Sequelize.TIME
      },
      endAt: {
        type: Sequelize.TIME
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
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('subjects');
  }
};
