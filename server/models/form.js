"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Form extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Form.belongsTo(models.Group, {
        foreignKey: "group_id",
        targetKey: "id",
      });
    }
  }
  Form.init(
    {
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      document_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Form",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );
  return Form;
};
