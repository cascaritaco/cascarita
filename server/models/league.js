/**
 * @swagger
 * components:
 *   schemas:
 *     League:
 *       type: object
 *       required:
 *         - group_id
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the league.
 *         group_id:
 *           type: integer
 *           description: The id of the group this league belongs to.
 *         name:
 *           type: string
 *           description: The name of the league.
 *         description:
 *           type: string
 *           description: A description of the league.
 *           nullable: true
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the league was created.
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the league was last updated.
 *       example:
 *         id: 1
 *         group_id: 1
 *         name: "Summer Soccer League"
 *         description: "Annual summer soccer league for all age groups"
 *         created_at: "2023-05-01T00:00:00.000Z"
 *         updated_at: "2023-05-01T00:00:00.000Z"
 */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class League extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      League.belongsTo(models.Group, {
        foreignKey: "group_id",
        targetKey: "id",
      });

      League.hasMany(models.Season, {
        foreignKey: "league_id",
        sourceKey: "id",
      });
    }
  }
  League.init(
    {
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "League",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return League;
};
