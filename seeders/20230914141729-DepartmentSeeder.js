"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const fakeNameDepartments = ['Science', 'Social Politycs', 'National and International Language'];
    const dataDepartments = [];

    for (let i = 0; i < fakeNameDepartments.length; i++) {
      dataDepartments.push({
        departmentName: fakeNameDepartments[i],
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert("departments", dataDepartments, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("departments", null, {});
  },
};
