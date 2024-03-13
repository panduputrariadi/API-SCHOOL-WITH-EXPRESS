"use strict";
const faker = require("faker");
const { QueryTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const fakeStudents = [];
    const departments = await queryInterface.sequelize.query(
      "SELECT * FROM departments",
      {
        type: QueryTypes.SELECT,
      }
    );
    

    for (let i = 0; i <= 3; i++) {
      const randomDepartment = faker.random.arrayElement(departments);
      fakeStudents.push({
        name: faker.name.findName(),
        address: faker.address.streetAddress(),
        dob: faker.date.between("1990-01-01", "2005-12-31"),
        departmentsId: randomDepartment.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert("students", fakeStudents);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("students", null, {});
  },
};
