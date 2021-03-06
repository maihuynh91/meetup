'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    image: {
      type: DataTypes.STRING,
      allowNull:true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: "must be a valid email" }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
     type: DataTypes.STRING,
     allowNull: false
   },
   role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "member"
  },
  
   
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Comment, {
      foreignKey: "userId",
      as: "comments"
    });
    User.hasMany(models.MeetingUser, {
      foreignKey: "userId",
      as: "meetingUsers"
    })

  };
  
  User.prototype.isAdmin = function() {
    return this.role === "admin";
  };

  
  return User;
};