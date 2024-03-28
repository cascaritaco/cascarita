"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Division extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Division.belongsTo(models.Group, { 
        foreignKey: "group_id",
        targetKey: "id",
      });
    }
  }
  Division.init(
    {
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: ["group_id"],
          msg: "Division name must be unique within a Group",
        },
      },
  },
    {
      sequelize,
      modelName: "Division",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Division;
};
