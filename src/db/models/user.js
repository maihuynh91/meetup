'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: "must be a valid email" }
      }
    },

    password: {
     type: DataTypes.STRING,
     allowNull: false
   },
   role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "guest"
  },
  
   
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Post, {
      foreignKey: "userId",
      as: "posts"
    });

    User.hasMany(models.Discussion, {
      foreignKey: "userId",
      as: "discussions"
    });


  };

  User.prototype.isAdmin = function() {
    return this.role === "admin";
  };
  
  return User;
};