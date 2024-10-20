/**
 * @swagger
 * components:
 *   schemas:
 *     Team:
 *       type: object
 *       required:
 *         - group_id
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the team.
 *         group_id:
 *           type: integer
 *           description: The id of the group this team belongs to.
 *         name:
 *           type: string
 *           description: The name of the team. Must be between 1 and 30 characters.
 *         team_logo:
 *           type: string
 *           description: The URL of the team's logo.
 *           nullable: true
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the team was created.
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the team was last updated.
 *       example:
 *         id: 1
 *         group_id: 1
 *         name: "Thunderbolts"
 *         team_logo: "https://example.com/logo.png"
 *         created_at: "2023-05-01T00:00:00.000Z"
 *         updated_at: "2023-05-01T00:00:00.000Z"
 */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Team.belongsTo(models.Group, {
        foreignKey: "group_id",
        targetKey: "id",
      });

      Team.hasMany(models.TeamsSession, {
        foreignKey: "team_id",
        sourceKey: "id",
      });

      Team.hasMany(models.Games, {
        foreignKey: "team_id",
        sourceKey: "id",
      });
    }
  }
  Team.init(
    {
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "name field is required",
          },
          notEmpty: {
            msg: "name field cannot be empty",
          },
          len: {
            args: [1, 30],
            msg: "name must be between 1 and 30 characters",
          },
        },
      },
      team_logo: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: {
            msg: "team logo field cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Team",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Team;
};
