"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StripeStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StripeStatus.hasMany(models.UserStripeAccounts, {
        foreignKey: "stripe_status_id",
        sourceKey: "id",
      });
    }
  }
  StripeStatus.init(
    {
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      tableName: "StripeStatus",
      modelName: "StripeStatus",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );
  return StripeStatus;
};
