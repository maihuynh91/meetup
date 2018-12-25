'use strict';
let meetingUsers = [];
for (let i = 1; i <= 20; i += 2) {
  for (let j = 1; j < 15; j++) {
    meetingUsers.push({
      meetingId: j,
      userId: i,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("MeetingUsers", meetingUsers, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("MeetingUsers", null, {});
  }
};
