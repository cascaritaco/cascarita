"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.dropTable("TeamsDivisionsHistories");
  },

  async down(queryInterface, Sequelize) {},
};
