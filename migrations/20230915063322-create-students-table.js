'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('students', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: Sequelize.STRING, // Tambahkan kolom username
        allowNull: false, // Buat kolom ini wajib diisi
        unique: true // Pastikan username unik
      },
      password: {
        type: Sequelize.STRING, // Tambahkan kolom password
        allowNull: false // Buat kolom ini wajib diisi
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
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
    }, {
      timestamp: true
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('students', 'departmentsId');
    await queryInterface.dropTable('students');
  }
};
