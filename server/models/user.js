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

      User.hasMany(models.Games, {
        foreignKey: "created_by_id",
        sourceKey: "id",
      });

      User.hasMany(models.Games, {
        foreignKey: "updated_by_id",
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
            msg: "First name field is required",
          },
          notEmpty: {
            msg: "First name field cannot be empty",
          },
          len: {
            args: [1, 30],
            msg: "First name must be between 1 and 30 characters",
          },
        },
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Last name field is required",
          },
          notEmpty: {
            msg: "Last name field cannot be empty",
          },
          len: {
            args: [1, 30],
            msg: "Last name must be between 1 and 30 characters",
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
            msg: "Email field is required",
          },
          notEmpty: {
            msg: "Email field cannot be empty",
          },
          len: {
            args: [1, 30],
            msg: "Email must be between 1 and 30 characters",
          },
        },
      },
      password: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password field is required",
          },
          notEmpty: {
            msg: "Password field cannot be empty",
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
    }
  );

  User.beforeCreate(async (user) => {
    const saltRounds = 10;
    user.password = await Bcrypt.hash(user.password, saltRounds);
  });

  User.prototype.validPassword = async function (password) {
    return await Bcrypt.compare(password, this.password);
  };

  return User;
};
