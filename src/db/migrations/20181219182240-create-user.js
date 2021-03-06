'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      image: {
        type: Sequelize.STRING,
        allowNull:true
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        unique: true,
        validate: {
          isEmail: { msg: "must be a valid email" }
        },
        type: Sequelize.STRING
      },

      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      role:{
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "member"
      }, 
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};