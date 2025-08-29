'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class taskHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  taskHistory.init({
    taskId: DataTypes.INTEGER,
    changedBy: DataTypes.STRING,
    changedField: DataTypes.STRING,
    oldValue: DataTypes.TEXT,
    newValue: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'taskHistory',
  });
  return taskHistory;
};