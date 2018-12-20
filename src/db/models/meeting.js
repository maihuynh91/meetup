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
  

  }, {});
  Meeting.associate = function(models) {
    // associations can be defined here
    Meeting.hasMany(models.Post, {
      foreignKey: "meetingId",
      as: "posts"
    });
  };
  return Meeting;
};