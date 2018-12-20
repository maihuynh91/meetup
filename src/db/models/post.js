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
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.Meeting, {
      foreignKey: "meetingId",
      onDelete: "CASCADE"
    });
    Post.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
    Post.hasMany(models.Discussion, {
      foreignKey: "postId",
      as: "discussions"
    });
    
  };
  Post.prototype.isOwner=function(){
    return this.userId === this.foreignKey;
  }
  return Post;
};