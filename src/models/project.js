'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Project.belongsTo(models.User, {foreignKey: 'createdBy', targetKey: 'id', as: 'creatorData'})
      Project.belongsTo(models.User, {foreignKey: 'createdBy', targetKey: 'id', as: 'creatorInfo'})
      Project.hasMany(models.Task, {foreignKey: 'projectId', as: 'projectData'})
      // Project.belongsTo(models.projectMember, {foreignKey: 'projectId', targetKey: 'id', as: 'projectMemberInfo'})
    }
  }
  Project.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    startDate: DataTypes.STRING,
    endDate: DataTypes.STRING,
    status: DataTypes.STRING,
    createdBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};