"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Groups", [
      {
        name: "Italian Soccer Federation",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    const groupId = await queryInterface.rawSelect(
      "Groups",
      {
        where: { name: "Italian Soccer Federation" },
      },
      ["id"]
    );

    // Insert data into the Leagues table
    return queryInterface.bulkInsert("Leagues", [
      {
        name: "Serie A",
        group_id: groupId,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Groups", {
      name: "Italian Soccer Federation",
    });
  },
};
