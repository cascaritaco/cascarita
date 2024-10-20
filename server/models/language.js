/**
 * @swagger
 * components:
 *   schemas:
 *     Language:
 *       type: object
 *       required:
 *         - language
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the language.
 *         language:
 *           type: string
 *           description: The name of the language.
 *           unique: true
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the language was created.
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the language was last updated.
 *       example:
 *         id: 1
 *         language: "English"
 *         created_at: "2023-05-01T00:00:00.000Z"
 *         updated_at: "2023-05-01T00:00:00.000Z"
 */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Language extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Language.hasMany(models.User, {
        foreignKey: "language_id",
        sourceKey: "id",
      });
    }
  }
  Language.init(
    {
      language: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Language",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Language;
};
