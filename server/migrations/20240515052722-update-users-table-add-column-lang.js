"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // Check if 'language_id' column already exists
      const tableDescription = await queryInterface.describeTable("Users");
      if (!tableDescription.language_id) {
        // Step 1: Add 'language_id' column with foreign key if it doesn't exist
        await queryInterface.addColumn(
          "Users",
          "language_id",
          {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: "Languages",
              key: "id",
            },
            onUpdate: "RESTRICT",
            onDelete: "RESTRICT",
          },
          { transaction },
        );
      }

      // Step 2: Set 'language_id' default values
      await queryInterface.bulkUpdate(
        "Users",
        { language_id: 1 }, // Adjust this default value as needed
        null,
        { transaction },
      );

      // Step 3: Remove the foreign key constraint on 'language_id'
      await queryInterface.removeConstraint(
        "Users",
        "Users_language_id_foreign_idx",
        { transaction },
      );

      // Step 4: Modify 'language_id' column to be NOT NULL
      await queryInterface.changeColumn(
        "Users",
        "language_id",
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        { transaction },
      );

      // Step 5: Reapply the foreign key constraint on 'language_id'
      await queryInterface.addConstraint("Users", {
        fields: ["language_id"],
        type: "foreign key",
        name: "Users_language_id_foreign_idx", // Ensure this matches your previous constraint name
        references: {
          table: "Languages",
          field: "id",
        },
        onUpdate: "RESTRICT",
        onDelete: "RESTRICT",
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
