'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn("Seasons", "group_id", { transaction });

      // Create a group
      const groupName = "Default group"
      await queryInterface.bulkInsert("Groups", [
        {
          name: groupName,
          street_address: "123 Main St",
          city: "Watsonville",
          state: "CA",
          zip_code: "95076",
          created_at: new Date(),
          updated_at: new Date(),
        }
      ], { transaction });
      let result = await queryInterface.sequelize.query(
        "SELECT id FROM `Groups` WHERE name = ?",
        {
          replacements: [groupName],
          type: Sequelize.QueryTypes.SELECT,
          transaction: transaction,
        }
      );
      const group = result[0];
      // Create a league
      const leagueName = "Default league"
      await queryInterface.bulkInsert("Leagues", [
        {
          group_id: group.id,
          name: leagueName,
          created_at: new Date(),
          updated_at: new Date(),
        }
      ], { transaction });
      result = await queryInterface.sequelize.query(
        "SELECT id FROM `Leagues` WHERE name = ?",
        {
          replacements: [leagueName],
          type: Sequelize.QueryTypes.SELECT,
          transaction: transaction,
        }
      );
      const league = result[0];

      await queryInterface.addColumn("Seasons", "league_id", {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Leagues",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }, { transaction });

      await queryInterface.bulkUpdate("Seasons", {
        league_id: league.id,
      }, null, { transaction });

      await queryInterface.changeColumn("Seasons", "league_id", {
        allowNull: false,
      }, { transaction });

      await transaction.commit();
    } catch (_error) {
      await transaction.rollback();
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn("Season", "group_id", {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Groups",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }, { transaction });
      await queryInterface.removeColumn("Seasons", "league_id", { transaction });
      await queryInterface.bulkDelete("Leagues", {
        name: leagueName,
      }, { transaction });
      await queryInterface.bulkDelete("Groups", {
        name: groupName,
      }, { transaction });
      await transaction.commit();
    } catch (_error) {
      await transaction.rollback();
    }
  }
};
