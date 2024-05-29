"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn("Users", "language_id", {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Languages",
          key: "id",
        },
        onUpdate: "RESTRICT",
        onDelete: "RESTRICT",
        transaction,
      });

      await queryInterface.bulkUpdate(
        "Users",
        {
          language_id: 1,
        },
        null,
        { transaction }
      );

      await queryInterface.changeColumn(
        "Users",
        "language_id",
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.removeColumn("Users", "language_id", {
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
