/**
 * @swagger
 * components:
 *   schemas:
 *     Fields:
 *       type: object
 *       required:
 *         - group_id
 *         - name
 *         - address
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the field.
 *         group_id:
 *           type: integer
 *           description: The id of the group this field belongs to.
 *         name:
 *           type: string
 *           description: The name of the field. Must be between 1 and 255 characters.
 *         address:
 *           type: string
 *           description: The address of the field. Must be between 1 and 255 characters.
 *         length:
 *           type: number
 *           format: float
 *           description: The length of the field in meters. Must be a positive number.
 *         width:
 *           type: number
 *           format: float
 *           description: The width of the field in meters. Must be a positive number.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the field was created.
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the field was last updated.
 *       example:
 *         id: 1
 *         group_id: 1
 *         name: "Main Soccer Field"
 *         address: "123 Sports Ave, Sportsville, SP 12345"
 *         length: 105
 *         width: 68
 *         created_at: "2023-05-01T00:00:00.000Z"
 *         updated_at: "2023-05-01T00:00:00.000Z"
 */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Fields extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Fields.belongsTo(models.Group, { foreignKey: "group_id" });
    }
  }
  Fields.init(
    {
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 255],
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 255],
        },
      },
      length: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          isFloat: true,
          min: 0,
        },
      },
      width: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          isFloat: true,
          min: 0,
        },
      },
    },
    {
      sequelize,
      modelName: "Fields",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Fields;
};
