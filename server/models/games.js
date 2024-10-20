/**
 * @swagger
 * components:
 *   schemas:
 *     Games:
 *       type: object
 *       required:
 *         - session_id
 *         - game_date
 *         - game_time
 *         - away_team_id
 *         - away_team_goals
 *         - home_team_id
 *         - home_team_goals
 *         - winner_id
 *         - loser_id
 *         - draw
 *         - game_status_id
 *         - field_id
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the game.
 *         session_id:
 *           type: integer
 *           description: The id of the session this game belongs to.
 *         game_date:
 *           type: string
 *           format: date
 *           description: The date of the game.
 *         game_time:
 *           type: string
 *           format: time
 *           description: The time of the game.
 *         away_team_id:
 *           type: integer
 *           description: The id of the away team.
 *         away_team_goals:
 *           type: integer
 *           description: The number of goals scored by the away team.
 *         home_team_id:
 *           type: integer
 *           description: The id of the home team.
 *         home_team_goals:
 *           type: integer
 *           description: The number of goals scored by the home team.
 *         winner_id:
 *           type: integer
 *           description: The id of the winning team.
 *         loser_id:
 *           type: integer
 *           description: The id of the losing team.
 *         draw:
 *           type: boolean
 *           description: Indicates if the game ended in a draw.
 *         game_status_id:
 *           type: integer
 *           description: The id of the game status.
 *         field_id:
 *           type: integer
 *           description: The id of the field where the game is played.
 *         created_by_id:
 *           type: integer
 *           description: The id of the user who created this game record.
 *         updated_by_id:
 *           type: integer
 *           description: The id of the user who last updated this game record.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the game record was created.
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the game record was last updated.
 *       example:
 *         id: 1
 *         session_id: 1
 *         game_date: "2023-05-01"
 *         game_time: "14:00:00"
 *         away_team_id: 2
 *         away_team_goals: 2
 *         home_team_id: 1
 *         home_team_goals: 3
 *         winner_id: 1
 *         loser_id: 2
 *         draw: false
 *         game_status_id: 1
 *         field_id: 1
 *         created_by_id: 10
 *         updated_by_id: 11
 *         created_at: "2023-05-01T00:00:00.000Z"
 *         updated_at: "2023-05-01T01:00:00.000Z"
 */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Games extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Games.belongsTo(models.Session, { foreignKey: "session_id" });
      Games.belongsTo(models.Team, {
        foreignKey: "away_team_id",
        sourceKey: "id",
      });
      Games.belongsTo(models.Team, {
        foreignKey: "home_team_id",
        sourceKey: "id",
      });

      Games.belongsTo(models.GameStatus, { foreignKey: "game_status_id" });
      Games.belongsTo(models.Fields, { foreignKey: "field_id" });

      Games.belongsTo(models.User, {
        foreignKey: "created_by_id",
        targetKey: "id",
      });
      Games.belongsTo(models.User, {
        foreignKey: "updated_by_id",
        targetKey: "id",
      });
    }
  }
  Games.init(
    {
      session_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      game_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      game_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      away_team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      away_team_goals: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      home_team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      home_team_goals: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      winner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      loser_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      draw: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      game_status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      field_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Games",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Games;
};
