/**
 * @swagger
 * components:
 *   schemas:
 *     UserStripeAccounts:
 *       type: object
 *       required:
 *         - user_id
 *         - stripe_account_id
 *         - details_submitted
 *         - requires_verification
 *         - charges_enabled
 *         - payouts_enabled
 *         - stripe_status_id
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user stripe account.
 *         user_id:
 *           type: integer
 *           description: The id of the user associated with this stripe account.
 *         stripe_account_id:
 *           type: string
 *           description: The unique identifier of the Stripe account.
 *         stripe_account_name:
 *           type: string
 *           description: The name of the Stripe account.
 *         platform_account_name:
 *           type: string
 *           description: The name of the platform account.
 *         platform_account_description:
 *           type: string
 *           description: The description of the platform account.
 *         account_email:
 *           type: string
 *           description: The email associated with the account.
 *         support_email:
 *           type: string
 *           description: The support email for the account.
 *         details_submitted:
 *           type: boolean
 *           description: Indicates if the account details have been submitted.
 *         requires_verification:
 *           type: boolean
 *           description: Indicates if the account requires verification.
 *         charges_enabled:
 *           type: boolean
 *           description: Indicates if charges are enabled for the account.
 *         payouts_enabled:
 *           type: boolean
 *           description: Indicates if payouts are enabled for the account.
 *         stripe_status_id:
 *           type: integer
 *           description: The id of the stripe status for this account.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the user stripe account was created.
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the user stripe account was last updated.
 *       example:
 *         id: 1
 *         user_id: 1
 *         stripe_account_id: "acct_1234567890"
 *         stripe_account_name: "John's Store"
 *         platform_account_name: "John's Platform Account"
 *         platform_account_description: "Account for John's online store"
 *         account_email: "john@example.com"
 *         support_email: "support@johnstore.com"
 *         details_submitted: true
 *         requires_verification: false
 *         charges_enabled: true
 *         payouts_enabled: true
 *         stripe_status_id: 1
 *         created_at: "2023-05-01T00:00:00.000Z"
 *         updated_at: "2023-05-01T00:00:00.000Z"
 */

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
      UserStripeAccounts.belongsTo(models.StripeStatus, {
        foreignKey: "stripe_status_id",
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
      stripe_account_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      platform_account_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      platform_account_description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      account_email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      support_email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      details_submitted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      requires_verification: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      charges_enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      payouts_enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      stripe_status_id: {
        type: DataTypes.INTEGER,
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
