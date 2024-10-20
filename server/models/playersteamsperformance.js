/**
 * @swagger
 * components:
 *   schemas:
 *     PlayersTeamsPerformance:
 *       type: object
 *       required:
 *         - player_team_id
 *         - jersey_number
 *         - goals
 *         - assist
 *         - yellow_cards
 *         - red_cards
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the player's team performance.
 *         player_team_id:
 *           type: integer
 *           description: The id of the player-team association this performance belongs to.
 *         jersey_number:
 *           type: integer
 *           description: The jersey number of the player.
 *         goals:
 *           type: integer
 *           description: The number of goals scored by the player.
 *         assist:
 *           type: integer
 *           description: The number of assists made by the player.
 *         yellow_cards:
 *           type: integer
 *           description: The number of yellow cards received by the player.
 *         red_cards:
 *           type: integer
 *           description: The number of red cards received by the player.
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
 *         player_team_id: 1
 *         jersey_number: 10
 *         goals: 2
 *         assist: 1
 *         yellow_cards: 1
 *         red_cards: 0
 *         created_at: "2023-05-01T00:00:00.000Z"
 *         updated_at: "2023-05-01T00:00:00.000Z"
 */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PlayersTeamsPerformance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PlayersTeamsPerformance.belongsTo(models.PlayersTeams, {
        foreignKey: "player_team_id",
      });
    }
  }
  PlayersTeamsPerformance.init(
    {
      player_team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      jersey_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      goals: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      assist: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      yellow_cards: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      red_cards: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "PlayersTeamsPerformance",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return PlayersTeamsPerformance;
};
