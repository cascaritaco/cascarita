'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plyaer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Plyaer.belongsTo(models.Team, { foreignKey: 'team_id' });
    }
  }
  Plyaer.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Plyaer',
  });
  return Plyaer;
};