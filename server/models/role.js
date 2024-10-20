/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *         - role_type
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the role.
 *         role_type:
 *           type: string
 *           description: The type of role.
 *           unique: true
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the role was created.
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the role was last updated.
 *       example:
 *         id: 1
 *         role_type: "Admin"
 *         created_at: "2023-05-01T00:00:00.000Z"
 *         updated_at: "2023-05-01T00:00:00.000Z"
 */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Role.hasMany(models.User, {
        foreignKey: "role_id",
        sourceKey: "id",
      });
    }
  }
  Role.init(
    {
      role_type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Role",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Role;
};
