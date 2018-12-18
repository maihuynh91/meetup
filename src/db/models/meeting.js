'use strict';
module.exports = (sequelize, DataTypes) => {
  const Meeting = sequelize.define('Meeting', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    host: DataTypes.STRING
  }, {});
  Meeting.associate = function(models) {
    // associations can be defined here
  };
  return Meeting;
};