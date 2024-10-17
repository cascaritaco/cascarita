"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        "UserStripeAccounts",
        "stripe_account_name",
        {
          type: Sequelize.STRING,
          allowNull: true,
          transaction,
        },
      );

      await queryInterface.addColumn(
        "UserStripeAccounts",
        "platform_account_name",
        {
          type: Sequelize.STRING,
          allowNull: true,
          transaction,
        },
      );

      await queryInterface.addColumn(
        "UserStripeAccounts",
        "platform_account_description",
        {
          type: Sequelize.STRING,
          allowNull: true,
          transaction,
        },
      );

      await queryInterface.addColumn("UserStripeAccounts", "account_email", {
        type: Sequelize.STRING,
        allowNull: true,
        transaction,
      });

      await queryInterface.addColumn("UserStripeAccounts", "support_email", {
        type: Sequelize.STRING,
        allowNull: true,
        transaction,
      });

      await queryInterface.addColumn(
        "UserStripeAccounts",
        "details_submitted",
        {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false,
          transaction,
        },
      );

      await queryInterface.addColumn(
        "UserStripeAccounts",
        "requires_verification",
        {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
          allowNull: false,
          transaction,
        },
      );

      await queryInterface.addColumn("UserStripeAccounts", "charges_enabled", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        transaction,
      });

      await queryInterface.addColumn("UserStripeAccounts", "payouts_enabled", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      "UserStripeAccounts",
      "stripe_account_name",
    );
    await queryInterface.removeColumn(
      "UserStripeAccounts",
      "platform_account_name",
    );
    await queryInterface.removeColumn(
      "UserStripeAccounts",
      "platform_account_description",
    );
    await queryInterface.removeColumn("UserStripeAccounts", "account_email");
    await queryInterface.removeColumn("UserStripeAccounts", "support_email");
    await queryInterface.removeColumn(
      "UserStripeAccounts",
      "details_submitted",
    );
    await queryInterface.removeColumn(
      "UserStripeAccounts",
      "requires_verification",
    );
    await queryInterface.removeColumn("UserStripeAccounts", "charges_enabled");
    await queryInterface.removeColumn("UserStripeAccounts", "payouts_enabled");
  },
};
