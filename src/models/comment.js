'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Project.belongsTo(models.User, {foreignKey: 'createdBy', targetKey: 'id', as: 'creatorInfo'})
      comment.belongsTo(models.User, {foreignKey: 'userId', targetKey: 'id', as: 'userInfoComment'})
      comment.belongsTo(models.Task, {foreignKey: 'taskId', targetKey: 'id', as: 'taskInfo'})
    }
  }
  comment.init({
    taskId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};