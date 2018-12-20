'use strict';
module.exports = (sequelize, DataTypes) => {
  const Discussion = sequelize.define('Discussion', {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Discussion.associate = function(models) {
    // associations can be defined here
    Discussion.belongsTo(models.Post, {
      foreignKey: "postId",
      onDelete: "CASCADE"
    });

    Discussion.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
  };


  return Discussion;
};