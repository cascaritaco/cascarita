/**
 * @swagger
 * components:
 *   schemas:
 *     GameStatus:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the game status.
 *         status:
 *           type: string
 *           description: The status of the game.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the game status was created.
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the game status was last updated.
 *       example:
 *         id: 1
 *         status: "Scheduled"
 *         created_at: "2023-05-01T00:00:00.000Z"
 *         updated_at: "2023-05-01T00:00:00.000Z"
 */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GameStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GameStatus.init(
    {
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "GameStatus",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return GameStatus;
};
