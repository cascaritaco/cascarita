"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Teams", "createdAt", "created_at");
    await queryInterface.renameColumn("Teams", "updatedAt", "updated_at");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Teams", "created_at", "createdAt");
    await queryInterface.renameColumn("Teams", "updated_at", "updatedAt");
  },
};
