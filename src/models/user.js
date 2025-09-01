'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Project, {foreignKey: 'createdBy', as: 'creatorInfo'})
      User.hasMany(models.Task, {foreignKey: 'assignedTo', as: 'userInfo'})
      User.hasMany(models.comment, {foreignKey: 'userId', as: 'userInfoComment'})
      User.hasMany(models.activityLog, {foreignKey: 'userId', as: 'userInfoActivityLog'})
    }
  }
  User.init({
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING,
    role: DataTypes.STRING,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};