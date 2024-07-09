"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("formPaymentIntents", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      payment_intent_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      form_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Forms",
          key: "id",
        },
      },
      user_stripe_account_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "UserStripeAccounts",
          key: "id",
        },
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("formPaymentIntents");
  },
};
