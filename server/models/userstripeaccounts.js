"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserStripeAccounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserStripeAccounts.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "id",
      });
    }
  }
  UserStripeAccounts.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stripe_account_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UserStripeAccounts",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );
  return UserStripeAccounts;
};
