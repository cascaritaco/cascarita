"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "created_at");
    await queryInterface.renameColumn("Users", "createdAt", "created_at");
  },

  async down(queryInterface, Sequelize) {},
};
