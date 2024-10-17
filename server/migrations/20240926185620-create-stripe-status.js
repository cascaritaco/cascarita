"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("StripeStatus", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.bulkInsert("StripeStatus", [
      {
        status: "Restricted",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        status: "Restricted Soon",
        created_at: new Date(),
        updated_at: new Date(),
      },
      { status: "Pending", created_at: new Date(), updated_at: new Date() },
      { status: "Enabled", created_at: new Date(), updated_at: new Date() },
      {
        status: "Complete",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        status: "Rejected",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("StripeStatus");
  },
};
