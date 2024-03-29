"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Session.hasMany(models.Division, { foreignKey: "division_id" });
      Session.hasMany(models.Season, { foreignKey: "season_id" });
      Session.hasMany(models.League, { foreignKey: "league_id" });
    }
  }
  Session.init(
    {
      division_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      season_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      league_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Session",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Session;
};
