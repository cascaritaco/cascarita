"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Roles", "updatedAt", "updated_at");
    await queryInterface.renameColumn("Roles", "createdAt", "created_at");
    await queryInterface.renameColumn("Sessions", "updatedAt", "updated_at");
    await queryInterface.renameColumn("Sessions", "createdAt", "created_at");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Roles", "updated_at", "updatedAt");
    await queryInterface.renameColumn("Roles", "created_at", "createdAt");
    await queryInterface.renameColumn("Sessions", "updated_at", "updatedAt");
    await queryInterface.renameColumn("Sessions", "created_at", "createdAt");
  },
};
