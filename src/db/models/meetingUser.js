'use strict';
module.exports = (sequelize, DataTypes) => {
  const MeetingUser = sequelize.define('MeetingUser', {
   
    meetingId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

  }, {});
  MeetingUser.associate = function(models) {
    // associations can be defined here
    MeetingUser.belongsTo(models.Meeting, {
      foreignKey: "meetingId",
      onDelete: "CASCADE"
    });
    MeetingUser.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
  };
  return MeetingUser;
};