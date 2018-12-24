'use strict';


const faker = require("faker");

//#2
 let meetings = [];

 for(let i = 1 ; i <= 15 ; i++){
  meetings.push({
     title: faker.hacker.noun(),
     description: faker.hacker.phrase(),
     body:faker.lorem.paragraphs(),
     date: faker.date.between('2019-01-01', '2019-12-31'),
     createdAt: new Date(),
     updatedAt: new Date()
   });
 }


module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert("Meetings", meetings, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete("Meetings", null, {});
  }
};
