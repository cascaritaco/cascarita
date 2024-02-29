"use strict";
const fs = require("fs");
const path = require("path");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Fetch the ID of the inserted Group
    const groups = await queryInterface.sequelize.query(
      "SELECT id FROM `Groups` WHERE name = ?",
      {
        replacements: ["The FA (Football Federation)"],
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const groupId = groups[0].id;

    const imageURL = "fake.url.com";

    const users = await queryInterface.sequelize.query(
      "SELECT id FROM `Users` WHERE name = ?",
      {
        replacements: ["Saul Messi"],
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const userId = users[0].id;

    const statuses = await queryInterface.sequelize.query(
      "SELECT id FROM `GameStatuses` WHERE status = ?",
      {
        replacements: ["Completed"],
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const statusId = statuses[0].id;

    const fields = await queryInterface.sequelize.query(
      "SELECT id FROM `Fields` WHERE name = ?",
      {
        replacements: ["Wembly"],
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const fieldsId = fields[0].id;

    const filePath = path.join(
      __dirname,
      "..",
      "mockData",
      "england",
      "premier-league-team-2015-file.json"
    );

    let teams = fs.readFileSync(filePath, "utf-8");

    for (let i = 0; i < teams.length; i++) {
      teams[i].group_id = groupId;
      teams[i].updated_at = new Date();
      teams[i].created_at = new Date();
      teams[i].team_log = imageURL;
    }

    await queryInterface.bulkInsert("Teams", teams, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
