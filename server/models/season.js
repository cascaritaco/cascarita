"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Season extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) { }
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
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Season",
      hooks: {
        beforeCreate: (season, _options) => {
          const now = new Date()
            .toISOString()
            .replace(/T/, " ")
            .replace(/\..+/g, "");
          season.dataValues.created_at = now;
          season.dataValues.updated_at = now;
        },
        beforeUpdate: (season, _options) => {
          season.dataValues.updated_at = new Date()
            .toISOString()
            .replace(/T/, " ")
            .replace(/\..+/g, "");
        },
      },
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );
  return Season;
};
