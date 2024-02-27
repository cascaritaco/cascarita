"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TeamsPerformances", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      team_session_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "TeamsSessions",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      games_played: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      wins: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      losses: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      draws: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      goals_against: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      goals_for: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      goals_differential: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      table_position: {
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
    await queryInterface.dropTable("TeamsPerformances");
  },
};
