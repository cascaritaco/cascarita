"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Season extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Season.belongsTo(models.League, {
        foreignKey: "league_id",
        targetKey: "id",
      });
      Season.hasMany(models.Session, {
        foreignKey: "season_id",
        sourceKey: "id",
      });
    }
  }
  Season.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
          isAfterStartDate(value) {
            const startDate = new Date(this.start_date);
            const endDate = new Date(value);
            if (startDate > endDate) {
              throw new Error("start_date must be before end_date.");
            }
          },
        },
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      league_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Season",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );
  return Season;
};
