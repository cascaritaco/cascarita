/**
 * @swagger
 * components:
 *   schemas:
 *     Session:
 *       type: object
 *       required:
 *         - division_id
 *         - season_id
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the session.
 *         division_id:
 *           type: integer
 *           description: The id of the division this session belongs to.
 *         season_id:
 *           type: integer
 *           description: The id of the season this session belongs to.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the session was created.
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the session was last updated.
 *       example:
 *         id: 1
 *         division_id: 1
 *         season_id: 1
 *         created_at: "2023-05-01T00:00:00.000Z"
 *         updated_at: "2023-05-01T00:00:00.000Z"
 */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Session.belongsTo(models.Season, {
        foreignKey: "season_id",
        targetKey: "id",
      });

      Session.belongsTo(models.Division, {
        foreignKey: "division_id",
        targetKey: "id",
      });

      Session.hasMany(models.TeamsSession, {
        foreignKey: "session_id",
        sourceKey: "id",
      });
    }
  }
  Session.init(
    {
      division_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      season_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Session",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Session;
};
