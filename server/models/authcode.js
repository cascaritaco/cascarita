/**
 * @swagger
 * components:
 *   schemas:
 *     AuthCode:
 *       type: object
 *       required:
 *         - user_id
 *         - email
 *         - code
 *         - start_date
 *         - expiration_date
 *       properties:
 *         user_id:
 *           type: integer
 *           description: The ID of the user associated with this auth code.
 *         email:
 *           type: string
 *           description: The email address associated with this auth code.
 *         code:
 *           type: string
 *           description: The authentication code.
 *         attempts:
 *           type: integer
 *           description: The number of attempts made with this auth code.
 *         start_date:
 *           type: string
 *           format: date-time
 *           description: The date and time when the auth code was created.
 *         expiration_date:
 *           type: string
 *           format: date-time
 *           description: The date and time when the auth code expires.
 *       example:
 *         user_id: 1
 *         email: "user@example.com"
 *         code: "123456"
 *         attempts: 0
 *         start_date: "2023-05-01T00:00:00.000Z"
 *         expiration_date: "2023-05-01T01:00:00.000Z"
 */

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
