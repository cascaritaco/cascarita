"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert a record into the `Groups` table

    await queryInterface.bulkInsert("Groups", [
      {
        name: "The FA (Football Federation)",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    // Fetch the ID of the inserted Group
    const groups = await queryInterface.sequelize.query(
      "SELECT id FROM `Groups` WHERE name = ?",
      {
        replacements: ["The FA (Football Federation)"],
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const groupId = groups[0].id; // Get the ID of the inserted Group

    // Insert a record into the `Divisions` table using the groupId as foreign key
    await queryInterface.bulkInsert("Divisions", [
      {
        name: "First Team",
        group_id: groupId,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    // Fetch the ID of the inserted Division
    const divisions = await queryInterface.sequelize.query(
      "SELECT id FROM `Divisions` WHERE group_id = ?",
      {
        replacements: [groupId],
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const divisionId = divisions[0].id; // Get the ID of the inserted Division

    // Insert a record into the `Seasons` table using the groupId as foreign key
    await queryInterface.bulkInsert("Seasons", [
      {
        name: "2015/16",
        start_date: new Date(),
        end_date: new Date(),
        is_active: true,
        group_id: groupId,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    // Fetch the ID of the inserted Season
    const seasons = await queryInterface.sequelize.query(
      "SELECT id FROM `Seasons` WHERE group_id = ?",
      {
        replacements: [groupId],
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const seasonId = seasons[0].id; // Get the ID of the inserted Season
    // Insert a record into the `Leagues` table using the groupId as foreign key
    await queryInterface.bulkInsert("Leagues", [
      {
        name: "Premier League",
        group_id: groupId,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    // Fetch the ID of the inserted League
    const leagues = await queryInterface.sequelize.query(
      "SELECT id FROM `Leagues` WHERE group_id = ?",
      {
        replacements: [groupId],
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const leagueId = leagues[0].id; // Get the ID of the inserted League
    // Insert a record into the `Sessions` table using the leagueId, divisionId, and seasonId as foreign keys
    await queryInterface.bulkInsert("Sessions", [
      {
        division_id: divisionId,
        season_id: seasonId,
        league_id: leagueId,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Roles", [
      {
        role_type: "Staff",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    // Fetch the ID of the inserted Role
    const roles = await queryInterface.sequelize.query(
      "SELECT id FROM `Roles` WHERE role_type = ?",
      {
        replacements: ["Staff"],
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const roleId = roles[0].id; // Get the ID of the inserted Role

    // Insert a record into the `Users` table using the groupId as foreign key and roleId as hardcoded value
    await queryInterface.bulkInsert("Users", [
      {
        first_name: "Saul",
        last_name: "Messi",
        email: "supercoolsaul@cool.com",
        password: "saul",
        group_id: groupId,
        role_id: roleId,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Fields", [
      {
        group_id: groupId, // Use the groupId as foreign key
        name: "Wembly",
        address: "Wembly St.",
        length: 100.0,
        width: 50.0,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("GameStatuses", [
      {
        status: "Completed",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.bulkDelete("Sessions", null, {}); // { league_id: leagues[0].id })
    // await queryInterface.bulkDelete("Leagues", null, {}); //{ group_id: groupId }
    // await queryInterface.bulkDelete("Seasons", null, {}); //{ group_id: groupId }
    // await queryInterface.bulkDelete("Divisions", null, {}); //{ group_id: groupId }
    await queryInterface.bulkDelete("Groups", {
      name: "The FA (Football Federation)",
    }); //{ id: groupId }
    await queryInterface.bulkDelete("Roles", {
      role_type: "Staff",
    }); // { league_id: leagues[0].id })
    // await queryInterface.bulkDelete("Fields", null, {}); //{ group_id: groupId }
    // await queryInterface.bulkDelete("Users", null, {}); //{ group_id: groupId }
    await queryInterface.bulkDelete("GameStatuses", { status: "Completed" }); //{ group_id: groupId }
  },
};
