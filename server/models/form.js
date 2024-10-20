/**
 * @swagger
 * components:
 *   schemas:
 *     Form:
 *       type: object
 *       required:
 *         - group_id
 *         - document_id
 *         - created_by
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the form.
 *         group_id:
 *           type: integer
 *           description: The id of the group this form belongs to.
 *         document_id:
 *           type: string
 *           description: The unique identifier of the document associated with this form.
 *         created_by:
 *           type: integer
 *           description: The id of the user who created this form.
 *         updated_by:
 *           type: integer
 *           nullable: true
 *           description: The id of the user who last updated this form.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the form was created.
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: A timestamp of when the form was last updated.
 *       example:
 *         id: 1
 *         group_id: 1
 *         document_id: "DOC123456"
 *         created_by: 10
 *         updated_by: 11
 *         created_at: "2023-05-01T00:00:00.000Z"
 *         updated_at: "2023-05-01T01:00:00.000Z"
 */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Form extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Form.belongsTo(models.Group, {
        foreignKey: "group_id",
        targetKey: "id",
      });

      Form.belongsTo(models.User, {
        foreignKey: "created_by",
        targetKey: "id",
      });
      Form.belongsTo(models.User, {
        foreignKey: "updated_by",
        targetKey: "id",
      });
      Form.hasMany(models.FormPaymentIntents, {
        foreignKey: "form_id",
        sourceKey: "id",
      });
    }
  }
  Form.init(
    {
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      document_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Form",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );
  return Form;
};
