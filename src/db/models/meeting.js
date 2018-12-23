'use strict';
module.exports = (sequelize, DataTypes) => {
  const Meeting = sequelize.define('Meeting', {
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    date: {
      allowNull: false,
      type:  DataTypes.DATE
    },
  
  }, {});
  Meeting.associate = function(models) {
    // associations can be defined here
    Meeting.hasMany(models.Comment, {
      foreignKey: "meetingId",
      as: "comments"
    });
    Meeting.hasMany(models.MeetingUser, {
      foreignKey: "meetingId", 
      as: "meetingUser"
    })
    
  };
  return Meeting;
};