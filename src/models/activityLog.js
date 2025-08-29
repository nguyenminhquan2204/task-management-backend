'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class activityLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  activityLog.init({
    userId: DataTypes.INTEGER,
    action: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'activityLog',
  });
  return activityLog;
};