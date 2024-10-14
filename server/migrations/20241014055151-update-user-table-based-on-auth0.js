"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.removeColumn("Users", "password", { transaction });
      await queryInterface.addColumn("Users", "picture", {
        type: Sequelize.STRING,
        allowNull: true,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        transaction,
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn("Users", "password", {
        type: Sequelize.STRING(64),
        allowNull: true,
        transaction,
      });

      await queryInterface.bulkUpdate(
        "Users",
        {
          password: "test",
        },
        null,
        { transaction },
      );

      await queryInterface.changeColumn(
        "Users",
        "password",
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        { transaction },
      );
      await queryInterface.removeColumn("Users", "picture", { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
