/**
 * @swagger
 * components:
 *   schemas:
 *     Player:
 *       type: object
 *       required:
 *         - group_id
 *         - first_name
 *         - last_name
 *         - date_of_birth
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the player.
 *         group_id:
 *           type: integer
 *           description: The id of the group this player belongs to.
 *         first_name:
 *           type: string
 *           description: The first name of the player.
 *         last_name:
 *           type: string
 *           description: The last name of the player.
 *         profile_picture:
 *           type: string
 *           description: URL of the player's profile picture.
 *           nullable: true
 *         date_of_birth:
 *           type: string
 *           format: date
 *           description: The date of birth of the player.
 *         phone_number:
 *           type: string
 *           description: The phone number of the player.
 *           nullable: true
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the player was created.
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the player was last updated.
 *       example:
 *         id: 1
 *         group_id: 1
 *         first_name: "John"
 *         last_name: "Doe"
 *         profile_picture: "https://example.com/profile.jpg"
 *         date_of_birth: "1990-01-01"
 *         phone_number: "+1234567890"
 *         created_at: "2023-05-01T00:00:00.000Z"
 *         updated_at: "2023-05-01T00:00:00.000Z"
 */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Player.belongsTo(models.Group, { foreignKey: "group_id" });
    }
  }
  Player.init(
    {
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profile_picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date_of_birth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Player",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Player;
};
