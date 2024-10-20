/**
 * @swagger
 * components:
 *   schemas:
 *     FormPaymentIntents:
 *       type: object
 *       required:
 *         - payment_intent_id
 *         - form_id
 *         - user_stripe_account_id
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the form payment intent.
 *         payment_intent_id:
 *           type: string
 *           description: The unique identifier of the Stripe payment intent.
 *         form_id:
 *           type: integer
 *           description: The id of the form associated with this payment intent.
 *         user_stripe_account_id:
 *           type: integer
 *           description: The id of the user's Stripe account associated with this payment intent.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the form payment intent was created.
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the form payment intent was last updated.
 *       example:
 *         id: 1
 *         payment_intent_id: "pi_1234567890abcdef"
 *         form_id: 1
 *         user_stripe_account_id: 1
 *         created_at: "2023-05-01T00:00:00.000Z"
 *         updated_at: "2023-05-01T00:00:00.000Z"
 */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FormPaymentIntents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FormPaymentIntents.belongsTo(models.UserStripeAccounts, {
        foreignKey: "user_stripe_account_id",
        targetKey: "id",
      });
      FormPaymentIntents.belongsTo(models.Form, {
        foreignKey: "form_id",
        targetKey: "id",
      });
    }
  }
  FormPaymentIntents.init(
    {
      payment_intent_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      form_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_stripe_account_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "FormPaymentIntents",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );
  return FormPaymentIntents;
};
