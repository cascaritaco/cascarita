/**
 * @swagger
 * components:
 *   schemas:
 *     Division:
 *       type: object
 *       required:
 *         - group_id
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the division.
 *         group_id:
 *           type: integer
 *           description: The id of the group this division belongs to.
 *         name:
 *           type: string
 *           description: The name of the division. Must be unique within a group and between 2 and 50 characters long.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the division was created.
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the division was last updated.
 *       example:
 *         id: 1
 *         group_id: 1
 *         name: "Junior Division"
 *         created_at: "2023-05-01T00:00:00.000Z"
 *         updated_at: "2023-05-01T00:00:00.000Z"
 */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Division extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Division.belongsTo(models.Group, {
        foreignKey: "group_id",
        targetKey: "id",
      });

      Division.hasMany(models.Session, {
        foreignKey: "division_id",
        sourceKey: "id",
      });
    }
  }
  Division.init(
    {
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: ["group_id"],
          msg: "Division name must be unique within a Group",
        },
        validate: {
          notEmpty: {
            args: true,
            msg: "Division name cannot be empty",
          },
          len: {
            args: [2, 50],
            msg: "Division name must be between 2 and 50 characters long",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Division",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Division;
};
