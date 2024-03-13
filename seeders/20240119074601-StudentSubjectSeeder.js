'use strict';

const faker = require("faker");
const { QueryTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const fakeStudentSUbject = [];
    const student = await queryInterface.sequelize.query(
      "SELECT * FROM students", {
        type: QueryTypes.SELECT
      }
    );
    const subject = await queryInterface.sequelize.query(
      "SELECT * FROM subjects",
      {
        type: QueryTypes.SELECT,
      }
    );

    for (let i = 0; i<= 3; i++){
      const randomStudent = faker.random.arrayElement(student);
      const randomSubject = faker.random.arrayElement(subject);

      fakeStudentSUbject.push({
        studentsid: randomStudent.id,
        subjectsId: randomSubject.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert("studentSubjects", fakeStudentSUbject);
  },
  

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete("studentSubjects", null, {});
  }
};
