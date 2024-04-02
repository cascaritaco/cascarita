"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Group.hasMany(models.Season, {
        foreignKey: "group_id",
        sourceKey: "id",
      });
      Group.hasMany(models.League, {
        foreignKey: "group_id",
        sourceKey: "id",
      });
      Group.hasMany(models.Season, {
        foreignKey: "group_id",
        sourceKey: "id",
      });
    }
  }
  Group.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Group",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );
  return Group;
};
