"use strict";

const { StripeStatus } = require("../models");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const defaultStatus = await StripeStatus.findOne({
        where: {
          status: "Restricted",
        },
      });

      const defaultStatusId = defaultStatus.id;

      await queryInterface.addColumn("UserStripeAccounts", "stripe_status_id", {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "StripeStatus",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
        defaultValue: defaultStatusId,
        transaction,
      });

      await queryInterface.bulkUpdate(
        "UserStripeAccounts",
        { stripe_status_id: defaultStatusId },
        {},
        { transaction },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("UserStripeAccounts", "stripe_status_id");
  },
};
