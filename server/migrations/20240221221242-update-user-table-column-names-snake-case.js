"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Users", "firstName", "first_name");
    await queryInterface.renameColumn("Users", "lastName", "last_name");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Users", "first_name", "firstName");
    await queryInterface.renameColumn("Users", "last_name", "lastName");
  },
};
