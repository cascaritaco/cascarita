/**
 * @swagger
 * components:
 *   schemas:
 *     StripeStatus:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the Stripe status.
 *         status:
 *           type: string
 *           description: The status of the Stripe account.
 *           unique: true
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the Stripe status was created.
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the Stripe status was last updated.
 *       example:
 *         id: 1
 *         status: "Verified"
 *         created_at: "2023-05-01T00:00:00.000Z"
 *         updated_at: "2023-05-01T00:00:00.000Z"
 */

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
