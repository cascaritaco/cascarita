"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Users", "roleId", "role_id");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Users", "role_id", "roleId");
  },
};
