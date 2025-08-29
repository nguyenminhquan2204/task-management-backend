'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('taskHistorys', {
      historyId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      taskId: {
        type: Sequelize.INTEGER
      },
      changedBy: {
        type: Sequelize.STRING
      },
      changedField: {
        type: Sequelize.STRING
      },
      oldValue: {
         type: Sequelize.TEXT
      },
      newValue: {
         type: Sequelize.TEXT
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('taskHistorys');
  }
};