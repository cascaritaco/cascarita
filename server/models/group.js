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
            msg: 'Name field is required'
          },
          notEmpty: {
            msg: 'Name field cannot be empty'
          },
        },
      },
      street_address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Street address field is required'
          },
          notEmpty: {
            msg: 'Street address field cannot be empty'
          },
          len: {
            args: [5, 100],
            msg: 'Street address must be between 5 and 100 characters'
          }
        },
      },
      city: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'City field is required'
          },
          notEmpty: {
            msg: 'City field cannot be empty'
          },
          len: {
            args: [2, 50],
            msg: 'City name must be between 2 and 50 characters'
          }
        },
      },
      state: {
        type: DataTypes.STRING(2),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'State field is required'
          },
          notEmpty: {
            msg: 'State field cannot be empty'
          },
          isIn: { 
           args: [['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']], // Valid US state abbreviations
           msg: 'Invalid state abbreviation'
        }
        },
      },
      zip_code: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'ZIP code field is required'
          },
          notEmpty: {
            msg: 'ZIP code field cannot be empty'
          },
          is: {
            args: /^\d{5}(-\d{4})?$/,
            msg: 'Invalid ZIP code format'
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
    }
  );
  return Group;
};
