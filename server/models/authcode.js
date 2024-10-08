"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AuthCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AuthCode.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "id",
      });
    }
  }
  AuthCode.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      attempts: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      expiration_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "AuthCode",
      timestamps: false,
    },
  );
  return AuthCode;
};
