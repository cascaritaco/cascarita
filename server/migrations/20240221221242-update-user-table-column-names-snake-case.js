"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Users", "firstName", "first_name");
    await queryInterface.renameColumn("Users", "lastName", "last_name");
    await queryInterface.renameColumn("Users", "groupId", "group_id");
    await queryInterface.renameColumn("Users", "roleId", "roleId");
    await queryInterface.renameColumn("Users", "updatedAt", "updated_at");
    await queryInterface.renameColumn("Users", "createdAt", "created_at");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Users", "first_name", "firstName");
    await queryInterface.renameColumn("Users", "last_name", "lastName");
    await queryInterface.renameColumn("Users", "group_id", "groupId");
    await queryInterface.renameColumn("Users", "role_id", "roleId");
    await queryInterface.renameColumn("Users", "updated_at", "updatedAt");
    await queryInterface.renameColumn("Users", "created_at", "createdAt");
  },
};
