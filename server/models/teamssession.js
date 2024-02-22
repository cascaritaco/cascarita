"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TeamsSession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TeamsSession.belongsTo(models.Session, { foreignKey: "session_id" });
      TeamsSession.belongsTo(models.Team, { foreignKey: "team_id" });
    }
  }
  TeamsSession.init(
    {
      session_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "TeamsSession",
    }
  );
  return TeamsSession;
};
