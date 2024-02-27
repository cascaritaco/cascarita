"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Teams", "group_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Groups",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    await queryInterface.addColumn("Teams", "team_logo", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Teams", "group_id");
    await queryInterface.removeColumn("Teams", "team_logo");
  },
};
