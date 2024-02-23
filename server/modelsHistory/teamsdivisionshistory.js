"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TeamsDivisionsHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TeamsDivisionsHistory.belongsTo(models.Team, { foreignKey: "team_id" });
      TeamsDivisionsHistory.belongsTo(models.Division, {
        foreignKey: "division_id",
      });
    }
  }
  TeamsDivisionsHistory.init(
    {
      team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Teams",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      division_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Divisions",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "TeamsDivisionsHistory",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return TeamsDivisionsHistory;
};
