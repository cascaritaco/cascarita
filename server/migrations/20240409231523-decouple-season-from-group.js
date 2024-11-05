"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const groupName = "Default group";
    const leagueName = "Default league";
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // Step 1: Check if 'group_id' exists before trying to remove it
      const tableDescription = await queryInterface.describeTable("Seasons");

      if (tableDescription.group_id) {
        await queryInterface.removeColumn("Seasons", "group_id", {
          transaction,
        });
      }

      await queryInterface.bulkInsert(
        "Groups",
        [
          {
            name: groupName,
            street_address: "123 Main St",
            city: "Watsonville",
            state: "CA",
            zip_code: "95076",
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        { transaction },
      );

      let result = await queryInterface.sequelize.query(
        "SELECT id FROM `Groups` WHERE name = ?",
        {
          replacements: [groupName],
          type: Sequelize.QueryTypes.SELECT,
          transaction,
        },
      );
      const group = result[0];

      await queryInterface.bulkInsert(
        "Leagues",
        [
          {
            group_id: group.id,
            name: leagueName,
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        { transaction },
      );

      result = await queryInterface.sequelize.query(
        "SELECT id FROM `Leagues` WHERE name = ?",
        {
          replacements: [leagueName],
          type: Sequelize.QueryTypes.SELECT,
          transaction,
        },
      );
      const league = result[0];

      // Step 2: Check if 'league_id' exists before adding it
      if (!tableDescription.league_id) {
        await queryInterface.addColumn(
          "Seasons",
          "league_id",
          {
            type: Sequelize.INTEGER,
            allowNull: true,
          },
          { transaction },
        );
      }

      // Step 3: Update 'league_id' values in 'Seasons'
      await queryInterface.bulkUpdate(
        "Seasons",
        { league_id: league.id },
        null,
        { transaction },
      );

      // Step 4: Attempt to remove the foreign key constraint if it exists
      try {
        await queryInterface.removeConstraint(
          "Seasons",
          "Seasons_league_id_foreign_idx",
          {
            transaction,
          },
        );
      } catch (error) {
        console.warn(
          "Constraint Seasons_league_id_foreign_idx does not exist, skipping removal.",
        );
      }

      // Step 5: Modify 'league_id' column with new constraints
      await queryInterface.changeColumn(
        "Seasons",
        "league_id",
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Leagues",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        { transaction },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.error("Migration failed:", error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const groupName = "Default group";
    const leagueName = "Default league";
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn("Seasons", "league_id", {
        transaction,
      });

      const group = await queryInterface.sequelize.query(
        "SELECT id FROM `Groups` WHERE name = ?",
        {
          replacements: [groupName],
          type: Sequelize.QueryTypes.SELECT,
          transaction: transaction,
        },
      );

      if (!group) {
        throw new Error("failed to create a group");
      }

      await queryInterface.addColumn(
        "Seasons",
        "group_id",
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: "Groups",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        { transaction },
      );

      await queryInterface.bulkUpdate(
        "Seasons",
        {
          group_id: group[0].id,
        },
        null,
        { transaction },
      );

      await queryInterface.changeColumn(
        "Seasons",
        "group_id",
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        { transaction },
      );

      // Deletes the "Default group" and "Default league" from their tables.
      await queryInterface.sequelize.query(
        "DELETE FROM `Groups` WHERE id = ?",
        {
          replacements: [group[0].id],
          type: Sequelize.QueryTypes.DELETE,
          transaction: transaction,
        },
      );

      await queryInterface.sequelize.query(
        "DELETE FROM `Leagues` WHERE name = ?",
        {
          replacements: [leagueName],
          type: Sequelize.QueryTypes.DELETE,
          transaction: transaction,
        },
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
