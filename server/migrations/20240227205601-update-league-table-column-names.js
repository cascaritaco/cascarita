"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Leagues", "updatedAt", "updated_at");
    await queryInterface.renameColumn("Leagues", "createdAt", "created_at");
    await queryInterface.renameColumn("Leagues", "groupId", "group_id");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Leagues", "updated_at", "updatedAt");
    await queryInterface.renameColumn("Leagues", "created_at", "createdAt");
    await queryInterface.renameColumn("Leagues", "group_id", "groupId");
  },
};
