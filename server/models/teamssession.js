/**
 * @swagger
 * components:
 *   schemas:
 *     TeamsSession:
 *       type: object
 *       required:
 *         - session_id
 *         - team_id
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the teams session.
 *         session_id:
 *           type: integer
 *           description: The id of the session this team session belongs to.
 *         team_id:
 *           type: integer
 *           description: The id of the team associated with this session.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the teams session was created.
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the teams session was last updated.
 *       example:
 *         id: 1
 *         session_id: 1
 *         team_id: 1
 *         created_at: "2023-05-01T00:00:00.000Z"
 *         updated_at: "2023-05-01T00:00:00.000Z"
 */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TeamsSession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TeamsSession.belongsTo(models.Session, {
        foreignKey: "session_id",
        targetKey: "id",
      });

      TeamsSession.belongsTo(models.Team, {
        foreignKey: "team_id",
        targetKey: "id",
      });

      TeamsSession.hasMany(models.PlayersTeams, {
        foreignKey: "team_session_id",
        sourceKey: "id",
      });

      TeamsSession.hasMany(models.TeamsPerformances, {
        foreignKey: "team_session_id",
        sourceKey: "id",
      });
    }
  }
  TeamsSession.init(
    {
      session_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "TeamsSession",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return TeamsSession;
};
