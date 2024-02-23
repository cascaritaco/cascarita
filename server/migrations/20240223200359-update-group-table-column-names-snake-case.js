"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Groups", "updatedAt", "updated_at");
    await queryInterface.renameColumn("Groups", "createdAt", "created_at");

    await queryInterface.changeColumn("Groups", "name", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Groups", "updated_at", "updatedAt");
    await queryInterface.renameColumn("Groups", "created_at", "createdAt");
  },
};
