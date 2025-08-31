'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.Project, {foreignKey: 'projectId', targetKey: 'id', as: 'projectData'})
      Task.belongsTo(models.User, {foreignKey: 'assignedTo', targetKey: 'id', as: 'userInfo'})
    }
  }
  Task.init({
    projectId: DataTypes.INTEGER,
    assignedTo: DataTypes.INTEGER,  //reference to User
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.STRING,
    priority: DataTypes.STRING,
    dueDate: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};