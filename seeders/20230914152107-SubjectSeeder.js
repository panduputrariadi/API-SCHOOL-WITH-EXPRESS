'use strict';
const faker = require('faker');
const { QueryTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const fakeSubjects = [];
    const departments = await queryInterface.sequelize.query(
      'SELECT * FROM departments',
      {
        type: QueryTypes.SELECT,
      }
    );

    for (let i = 0; i <= 10; i++) {
      const randomDepartment = faker.random.arrayElement(departments);

      const startDate = faker.date.between(new Date(), new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000));
      const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

      fakeSubjects.push({
        subjectName: faker.random.word(),
        departmentsId: randomDepartment.id,
        startAt: startDate,
        endAt: endDate,
        alreadyFilled: faker.random.number({ min: 1, max: 40 }),
        maximumFilled: faker.random.number({ min: 40, max: 60 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('subjects', fakeSubjects, {});
  },

  async down(queryInterface, Sequelize) {
    // Tambahkan perintah untuk menghapus data seeder di sini jika diperlukan
    await queryInterface.bulkDelete('subjects', null, {});
  }
};
