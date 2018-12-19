'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    body: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    meetingId: {
      allowNull: false,
      type: DataTypes.STRING,
    }
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.Meeting, {
      foreignKey: "meetingId",
      onDelete: "CASCADE"
    });
  };
  return Post;
};