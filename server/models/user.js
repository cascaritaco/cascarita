/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *         - password
 *         - group_id
 *         - role_id
 *         - language_id
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user.
 *         first_name:
 *           type: string
 *           description: The first name of the user. Must be between 1 and 30 characters.
 *         last_name:
 *           type: string
 *           description: The last name of the user. Must be between 1 and 30 characters.
 *         email:
 *           type: string
 *           description: The email address of the user. Must be unique and between 1 and 30 characters.
 *         password:
 *           type: string
 *           description: The hashed password of the user.
 *         group_id:
 *           type: integer
 *           description: The id of the group this user belongs to.
 *         role_id:
 *           type: integer
 *           description: The id of the role assigned to this user.
 *         language_id:
 *           type: integer
 *           description: The id of the language preference for this user.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the user was created.
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the user was last updated.
 *       example:
 *         id: 1
 *         first_name: "John"
 *         last_name: "Doe"
 *         email: "john.doe@example.com"
 *         password: "hashedpassword"
 *         group_id: 1
 *         role_id: 1
 *         language_id: 1
 *         created_at: "2023-05-01T00:00:00.000Z"
 *         updated_at: "2023-05-01T00:00:00.000Z"
 */

"use strict";
const Bcrypt = require("bcrypt");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Group, {
        foreignKey: "group_id",
        targetKey: "id",
      });

      User.belongsTo(models.Role, {
        foreignKey: "role_id",
        targetKey: "id",
      });

      User.belongsTo(models.Language, {
        foreignKey: "language_id",
        targetKey: "id",
      });

      User.hasMany(models.Form, {
        foreignKey: "created_by",
        sourceKey: "id",
      });

      User.hasMany(models.Form, {
        foreignKey: "updated_by",
        sourceKey: "id",
      });

      User.hasMany(models.Games, {
        foreignKey: "created_by_id",
        sourceKey: "id",
      });

      User.hasMany(models.Games, {
        foreignKey: "updated_by_id",
        sourceKey: "id",
      });
      User.hasMany(models.UserStripeAccounts, {
        foreignKey: "user_id",
        sourceKey: "id",
      });
      User.hasMany(models.AuthCode, {
        foreignKey: "user_id",
        sourceKey: "id",
      });
    }
  }
  User.init(
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "first name field is required",
          },
          notEmpty: {
            msg: "first name field cannot be empty",
          },
          len: {
            args: [1, 30],
            msg: "first name must be between 1 and 30 characters",
          },
        },
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "last name field is required",
          },
          notEmpty: {
            msg: "last name field cannot be empty",
          },
          len: {
            args: [1, 30],
            msg: "last name must be between 1 and 30 characters",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notNull: {
            isEmail: true,
            msg: "email field is required",
          },
          notEmpty: {
            msg: "email field cannot be empty",
          },
          len: {
            args: [1, 30],
            msg: "email must be between 1 and 30 characters",
          },
        },
      },
      password: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
          notNull: {
            msg: "password field is required",
          },
          notEmpty: {
            msg: "password field cannot be empty",
          },
        },
      },
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      language_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );

  User.beforeCreate(async (user) => {
    const saltRounds = 10;
    user.password = await Bcrypt.hash(user.password, saltRounds);
  });

  User.beforeUpdate(async (user) => {
    if (user.changed("password")) {
      const saltRounds = 10;
      user.password = await Bcrypt.hash(user.password, saltRounds);
    }
  });

  User.prototype.validPassword = async function (password) {
    return await Bcrypt.compare(password, this.password);
  };

  return User;
};
