/**
 * @swagger
 * components:
 *   schemas:
 *     Season:
 *       type: object
 *       required:
 *         - name
 *         - start_date
 *         - end_date
 *         - league_id
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the season.
 *         name:
 *           type: string
 *           description: The name of the season.
 *         start_date:
 *           type: string
 *           format: date
 *           description: The start date of the season.
 *         end_date:
 *           type: string
 *           format: date
 *           description: The end date of the season. Must be after the start date.
 *         is_active:
 *           type: boolean
 *           description: Indicates whether the season is currently active.
 *         league_id:
 *           type: integer
 *           description: The id of the league this season belongs to.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the season was created.
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the season was last updated.
 *       example:
 *         id: 1
 *         name: "Summer 2023"
 *         start_date: "2023-06-01"
 *         end_date: "2023-08-31"
 *         is_active: true
 *         league_id: 1
 *         created_at: "2023-05-01T00:00:00.000Z"
 *         updated_at: "2023-05-01T00:00:00.000Z"
 */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Season extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Season.belongsTo(models.League, {
        foreignKey: "league_id",
        targetKey: "id",
      });
      Season.hasMany(models.Session, {
        foreignKey: "season_id",
        sourceKey: "id",
      });
    }
  }
  Season.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
          isAfterStartDate(value) {
            const startDate = new Date(this.start_date);
            const endDate = new Date(value);
            if (startDate > endDate) {
              throw new Error("start_date must be before end_date.");
            }
          },
        },
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      league_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Season",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );
  return Season;
};
