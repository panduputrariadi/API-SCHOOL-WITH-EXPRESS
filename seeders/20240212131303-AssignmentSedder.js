'use strict';

const faker = require('faker');
const { QueryTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const fakeAssignment = [];
    const subject = await queryInterface.sequelize.query(
      "SELECT * FROM subjects", {
        type: QueryTypes.SELECT
      }
    );

    for (let i = 0; i<=3; i++){
      const randomSubject = faker.random.arrayElement(subject);
      fakeAssignment.push({
        title: faker.lorem.words(),
        subjectsId: randomSubject.id,
        caption: faker.lorem.sentence(),
        dueDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('assignments', fakeAssignment);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('assignments', null, {});
  }
};
