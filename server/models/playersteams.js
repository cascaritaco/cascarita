/**
 * @swagger
 * components:
 *   schemas:
 *     PlayersTeams:
 *       type: object
 *       required:
 *         - team_session_id
 *         - player_id
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the players-teams association.
 *         team_session_id:
 *           type: integer
 *           description: The id of the team session this association belongs to.
 *         player_id:
 *           type: integer
 *           description: The id of the player in this association.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the association was created.
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the association was last updated.
 *       example:
 *         id: 1
 *         team_session_id: 1
 *         player_id: 1
 *         created_at: "2023-05-01T00:00:00.000Z"
 *         updated_at: "2023-05-01T00:00:00.000Z"
 */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PlayersTeams extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PlayersTeams.belongsTo(models.TeamsSession, {
        foreignKey: "team_session_id",
        targetKey: "id",
      });
      PlayersTeams.hasMany(models.Player, { foreignKey: "player_id" });
    }
  }
  PlayersTeams.init(
    {
      team_session_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      player_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "PlayersTeams",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return PlayersTeams;
};
