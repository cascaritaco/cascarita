"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PlayersTeamsPerformanceHistories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      player_team_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "PlayersTeams",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      jersey_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      goals: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      assist: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      yellow_cards: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      red_cards: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PlayersTeamsPerformanceHistories");
  },
};
