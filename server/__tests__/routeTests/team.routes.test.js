"use strict";

window.setImmediate = window.setTimeout;

const TestDataGenerator = require("../../utilityFunctions/testDataGenerator.js");
const request = require("supertest");
const express = require("express");
const LeagueRoutes = require("../../routes/team.routes.js");
const Middlewares = require("../../middlewares.js");
const app = express();
app.use(express.json());
app.use("/teams", LeagueRoutes);
app.use(Middlewares.errorHandler);
const testDb = require("../../models");
const { Session, TeamSession, sequelize } = require("../../models");

describe("Team Routes", () => {
  beforeEach(async () => {
    await testDb.Group.sync();
    await testDb.League.sync();
    await testDb.Division.sync();
    await testDb.Season.sync();
    await testDb.Session.sync();
    await testDb.Team.sync();
    await testDb.TeamsSession.sync();
  });

  // ------------------- Get Team by Group ID Tests ----------------

  it("should handle GET /getTeamByGroupId", async () => {
    const groupM = await TestDataGenerator.createDummyGroup("Group Uno");

    const team = await testDb.Team.create({
      name: "Sussy Sauls",
      group_id: groupM.id,
      team_logo: "www.google.com",
    });

    const response = await request(app)
      .get(`/teams/groups/${groupM.id}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: team.name })]),
    );
  });

  it("should not get any teams with GET /getTeamByGroupId", async () => {
    const groupM = await TestDataGenerator.createDummyGroup("Group Uno");

    const response = await request(app)
      .get(`/teams/groups/${groupM.id}`)
      .send();

    expect(response.status).toBe(500);
    expect(response.body).toMatchObject({
      message: "group with given id has no teams",
    });
  });

  it("should handle GET /getTeamsBySeasonDivisionId", async () => {
    const groupM = await TestDataGenerator.createDummyGroup("Group Uno");
    const leagueM = await TestDataGenerator.createLeague(
      "Dummy League",
      groupM.id,
    );
    const seasonM = await TestDataGenerator.createSeason(
      leagueM.id,
      "Dummy Season",
    );
    const divisionM = await TestDataGenerator.createDivision(
      groupM.id,
      "Dummy Division",
    );

    const sessionM = await testDb.Session.create({
      division_id: divisionM.id,
      season_id: seasonM.id,
    });

    const team = await testDb.Team.create({
      name: "Sussy Sauls",
      group_id: groupM.id,
      team_logo: "www.google.com",
    });

    const teamsSessionM = await testDb.TeamsSession.create({
      team_id: team.id,
      session_id: sessionM.id,
    });

    const response = await request(app)
      .get(`/teams/seasons/${seasonM.id}/divisions/${divisionM.id}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: team.name })]),
    );
  });

  it("should get empty array with GET /getTeamsBySeasonDivisionId", async () => {
    const groupM = await TestDataGenerator.createDummyGroup("Group Uno");

    const leagueM = await TestDataGenerator.createLeague(
      "Dummy League",
      groupM.id,
    );
    const seasonM = await TestDataGenerator.createSeason(
      leagueM.id,
      "Dummy Season",
    );
    const divisionM = await TestDataGenerator.createDivision(
      groupM.id,
      "Dummy Division",
    );

    const sessionM = await testDb.Session.create({
      division_id: divisionM.id,
      season_id: seasonM.id,
    });

    const team = await testDb.Team.create({
      name: "Sussy Sauls",
      group_id: groupM.id,
      team_logo: "www.google.com",
    });

    const teamsSessionM = await testDb.TeamsSession.create({
      team_id: team.id,
      session_id: sessionM.id,
    });

    const response = await request(app)
      .get(`/teams/seasons/${seasonM.id}/divisions/860`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject([]);
  });

  // ------------------- Create Tests ----------------

  it("should handle POST /create", async () => {
    const groupM = await TestDataGenerator.createDummyGroup("Salinas");

    const response = await request(app).post("/teams/").send({
      name: "Sussy Sauls",
      group_id: groupM.id,
      team_logo: "www.google.com",
    });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ name: "Sussy Sauls" });
  });

  it("should not create a team if team has non-unique name within division POST /create", async () => {
    const groupM = await TestDataGenerator.createDummyGroup("Salinas");
    const team = await testDb.Team.create({
      name: "Sussy Sauls",
      group_id: groupM.id,
      team_logo: "www.google.com",
    });

    const response = await request(app).post("/teams/").send({
      name: "Sussy Sauls",
      group_id: groupM.id,
      team_logo: "www.google.com",
    });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: "team name is not unique within the division",
    });
  });

  it("should handle creating a team with same names in different divisions POST /create", async () => {
    const groupOne = await TestDataGenerator.createDummyGroup("Salinas");
    const groupTwo = await TestDataGenerator.createDummyGroup("Watsonville");

    const team = await testDb.Team.create({
      name: "Sussy Sauls",
      group_id: groupOne.id,
      team_logo: "www.google.com",
    });

    const response = await request(app).post("/teams/").send({
      name: "Sussy Sauls",
      group_id: groupTwo.id,
      team_logo: "www.bing.com",
    });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ name: "Sussy Sauls" });
  });

  // ------------------- Update Tests ----------------

  it("should update team with valid ID and input PATCH /patch", async () => {
    const groupM = await TestDataGenerator.createDummyGroup("Group Uno");

    const team = await testDb.Team.create({
      name: "Sussy Sauls",
      group_id: groupM.id,
      team_logo: "www.google.com",
    });

    const updatedTeamName = "Jenni Fires";
    const response = await request(app)
      .patch(`/teams/${team.id}`)
      .send({ name: updatedTeamName });

    expect(response.status).toBe(200);

    const updatedTeam = await testDb.Team.findByPk(team.id);
    expect(updatedTeam.name).toBe(updatedTeamName);
  });

  it("should return an error if team not found PATCH /patch", async () => {
    const nonExistentTeamId = "9999";

    const response = await request(app)
      .patch(`/teams/${nonExistentTeamId}`)
      .send({ name: "Joe Mo Mah Inc." });

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      message: "team with given id was not found",
    });
  });

  it("should not update if the new name is already used within a division PATCH /patch", async () => {
    const groupM = await TestDataGenerator.createDummyGroup("Group Uno");

    const teamOne = await testDb.Team.create({
      name: "Sussy Sauls",
      group_id: groupM.id,
      team_logo: "www.google.com",
    });

    const teamTwo = await testDb.Team.create({
      name: "Raul Rangers",
      group_id: groupM.id,
      team_logo: "www.google.com",
    });

    const updatedTeamName = "Sussy Sauls";
    const response = await request(app)
      .patch(`/teams/${teamTwo.id}`)
      .send({ name: updatedTeamName });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: "team name is not unique within the division",
    });

    const updatedTeam = await testDb.Team.findByPk(teamTwo.id);
    expect(updatedTeam.name).toBe("Raul Rangers");
  });

  // ------------------- Delete Tests ----------------

  it("should delete a team with a valid team ID DELETE /delete", async () => {
    const groupM = await TestDataGenerator.createDummyGroup("Group Uno");

    const team = await testDb.Team.create({
      name: "Sussy Sauls",
      group_id: groupM.id,
      team_logo: "www.google.com",
    });

    const response = await request(app).delete(`/teams/${team.id}`).send();

    expect(response.status).toBe(204);
    expect(await testDb.Team.findByPk(team.id)).toBeNull();
  });

  it("should return an error when attempting to delete a non-existant team DELETE /delete", async () => {
    const response = await request(app).delete("/teams/999").send();

    expect(response.status).toBe(404);
  });

  // ------------------------------------------------

  afterEach(async () => {
    await testDb.TeamsSession.destroy({ where: {} });
    await testDb.Team.destroy({ where: {} });
    await testDb.Session.destroy({ where: {} });
    await testDb.Season.destroy({ where: {} });
    await testDb.Division.destroy({ where: {} });
    await testDb.League.destroy({ where: {} });
    await testDb.Group.destroy({ where: {} });
  });

  afterAll(async () => {
    await testDb.sequelize.close();
  });
});
