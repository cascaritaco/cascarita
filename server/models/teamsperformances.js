/**
 * @swagger
 * components:
 *   schemas:
 *     TeamsPerformances:
 *       type: object
 *       required:
 *         - team_session_id
 *         - games_played
 *         - wins
 *         - losses
 *         - draws
 *         - goals_against
 *         - goals_for
 *         - goals_differential
 *         - table_position
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the team performance record.
 *         team_session_id:
 *           type: integer
 *           description: The id of the team session this performance belongs to.
 *         games_played:
 *           type: integer
 *           description: The number of games played by the team.
 *         wins:
 *           type: integer
 *           description: The number of games won by the team.
 *         losses:
 *           type: integer
 *           description: The number of games lost by the team.
 *         draws:
 *           type: integer
 *           description: The number of games drawn by the team.
 *         goals_against:
 *           type: integer
 *           description: The number of goals scored against the team.
 *         goals_for:
 *           type: integer
 *           description: The number of goals scored by the team.
 *         goals_differential:
 *           type: integer
 *           description: The goal difference (goals for minus goals against).
 *         table_position:
 *           type: integer
 *           description: The team's position in the league table.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the performance record was created.
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the performance record was last updated.
 *       example:
 *         id: 1
 *         team_session_id: 1
 *         games_played: 10
 *         wins: 6
 *         losses: 2
 *         draws: 2
 *         goals_against: 8
 *         goals_for: 20
 *         goals_differential: 12
 *         table_position: 1
 *         created_at: "2023-05-01T00:00:00.000Z"
 *         updated_at: "2023-05-01T00:00:00.000Z"
 */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TeamsPerformances extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TeamsPerformances.belongsTo(models.TeamsSession, {
        foreignKey: "team_session_id",
        targetKey: "id",
      });
    }
  }
  TeamsPerformances.init(
    {
      team_session_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      games_played: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      wins: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      losses: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      draws: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      goals_against: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      goals_for: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      goals_differential: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      table_position: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "TeamsPerformances",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return TeamsPerformances;
};
