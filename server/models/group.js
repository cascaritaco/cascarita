/**
 * @swagger
 * components:
 *   schemas:
 *     Group:
 *       type: object
 *       required:
 *         - name
 *         - street_address
 *         - city
 *         - state
 *         - zip_code
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the group.
 *         name:
 *           type: string
 *           description: The name of the group.
 *         street_address:
 *           type: string
 *           description: The street address of the group. Must be between 5 and 100 characters.
 *         city:
 *           type: string
 *           description: The city of the group. Must be between 2 and 50 characters.
 *         state:
 *           type: string
 *           description: The state of the group. Must be a valid two-letter abbreviation.
 *         zip_code:
 *           type: string
 *           description: The zip code of the group. Must be a valid 5-digit or 5-digit plus 4-digit format.
 *         logo_url:
 *           type: string
 *           nullable: true
 *           description: The logo url of the group.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the group was created.
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the group was last updated.
 *       example:
 *         id: 1
 *         name: "Cascarita"
 *         street_address: "210 Salinas St"
 *         city: "Salinas"
 *         state: "CA"
 *         zip_code: "93905"
 *         logo_url: "https://example.com/logo.png"
 *         created_at: "2023-04-01T00:00:00.000Z"
 *         updated_at: "2023-04-01T00:00:00.000Z"
 */
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Group.hasMany(models.League, {
        foreignKey: "group_id",
        sourceKey: "id",
      });

      Group.hasMany(models.Division, {
        foreignKey: "group_id",
        sourceKey: "id",
      });

      Group.hasMany(models.Team, {
        foreignKey: "group_id",
        sourceKey: "id",
      });

      Group.hasMany(models.User, {
        foreignKey: "group_id",
        sourceKey: "id",
      });

      Group.hasMany(models.Form, {
        foreignKey: "group_id",
        sourceKey: "id",
      });
    }
  }
  Group.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notNull: {
            msg: "name field is required",
          },
          notEmpty: {
            msg: "name field cannot be empty",
          },
        },
      },
      street_address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "street address field is required",
          },
          notEmpty: {
            msg: "street address field cannot be empty",
          },
          len: {
            args: [5, 100],
            msg: "street address must be between 5 and 100 characters",
          },
        },
      },
      city: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notNull: {
            msg: "city field is required",
          },
          notEmpty: {
            msg: "city field cannot be empty",
          },
          len: {
            args: [2, 50],
            msg: "city name must be between 2 and 50 characters",
          },
        },
      },
      state: {
        type: DataTypes.STRING(2),
        allowNull: false,
        validate: {
          notNull: {
            msg: "state field is required",
          },
          notEmpty: {
            msg: "state field cannot be empty",
          },
          isIn: {
            args: [
              [
                "AL",
                "AK",
                "AZ",
                "AR",
                "CA",
                "CO",
                "CT",
                "DE",
                "FL",
                "GA",
                "HI",
                "ID",
                "IL",
                "IN",
                "IA",
                "KS",
                "KY",
                "LA",
                "ME",
                "MD",
                "MA",
                "MI",
                "MN",
                "MS",
                "MO",
                "MT",
                "NE",
                "NV",
                "NH",
                "NJ",
                "NM",
                "NY",
                "NC",
                "ND",
                "OH",
                "OK",
                "OR",
                "PA",
                "RI",
                "SC",
                "SD",
                "TN",
                "TX",
                "UT",
                "VT",
                "VA",
                "WA",
                "WV",
                "WI",
                "WY",
              ],
            ],
            msg: "Invalid state abbreviation",
          },
        },
      },
      zip_code: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          notNull: {
            msg: "zip code field is required",
          },
          notEmpty: {
            msg: "zip code field cannot be empty",
          },
          is: {
            args: /^\d{5}(-\d{4})?$/,
            msg: "invalid zip code format",
          },
        },
      },
      logo_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Group",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );
  return Group;
};
