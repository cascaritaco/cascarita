"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Fields", "group_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Groups",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    await queryInterface.addColumn("FieldsHistories", "group_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Groups",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Fields", "group_id");
    await queryInterface.removeColumn("FieldsHistories", "group_id");
  },
};
