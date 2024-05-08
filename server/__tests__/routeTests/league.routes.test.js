"use strict";

window.setImmediate = window.setTimeout;

const TestDataGenerator = require("../../utilityFunctions/testDataGenerator.js");
const request = require("supertest");
const express = require("express");
const LeagueRoutes = require("../../routes/league.routes");
const Middlewares = require("../../middlewares.js");
const app = express();
app.use(express.json());
app.use("/league", LeagueRoutes);
app.use(Middlewares.errorHandler);
const TestDb = require("../../models");

describe("League Routes", () => {
  beforeEach(async () => {
    await TestDb.Season.sync();
    await TestDb.Group.sync();
    await TestDb.League.sync();
  });

  describe("GET /league/:id/seasons", () => {
    it("should get a season by its group id", async () => {
      const group = await TestDataGenerator.createDummyGroup("Group Uno");
      const league = await TestDb.League.create({
        group_id: group.id,
        name: "My League",
      });

      await TestDb.Season.create({
        name: "Summer 2025",
        start_date: "2025-07-01 00:00:00",
        end_date: "2025-10-31 11:59:00",
        is_active: false,
        league_id: league.id,
      });
      await TestDb.Season.create({
        name: "Winter 2024",
        start_date: "2024-11-01 00:00:00",
        end_date: "2025-03-14 11:59:00",
        is_active: true,
        league_id: league.id,
      });

      const response = await request(app).get(`/league/${league.id}/seasons`).send();

      expect(response.status).toBe(200);
      response.body.forEach((season) => expect(season.league_id).toBe(league.id));
    });

    it("should fail if group not found", async () => {
      const invalidId = 12999;
      const response = await request(app).get(`/league/${invalidId}/seasons`).send();

      expect(response.status).toBe(404);
    });
  });

  // ------------------- Create Tests ----------------

  it("should handle POST /create", async () => {
    const groupM = await TestDataGenerator.createDummyGroup("Salinas");

    const response = await request(app)
      .post("/league/")
      .send({ group_id: groupM.id, name: "SOMOS" });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      success: true,
      data: expect.objectContaining({ name: "SOMOS" }),
    });
  });

  it("should not create if name is not unique POST /create", async () => {
    const groupM = await TestDataGenerator.createDummyGroup("Saul's Group");

    await TestDb.League.create({ group_id: groupM.id, name: "Salinas" });

    const response = await request(app)
      .post("/league/")
      .send({ group_id: groupM.id, name: "Salinas" });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: "Name is not unique",
    });
  });

  it("should create a league with the same name from a different group POST /create", async () => {
    const groupUno = await TestDataGenerator.createDummyGroup("Watsonville Corp.");
    const groupDos = await TestDataGenerator.createDummyGroup("Salinas Inc.");

    await TestDb.League.create({ group_id: groupUno.id, name: "Summer 2024" });

    const response = await request(app)
      .post("/league/")
      .send({ group_id: groupDos.id, name: "Summer 2024" });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      success: true,
      data: expect.objectContaining({ name: "Summer 2024" }),
    });
  });

  // ------------------- Update Tests ----------------

  it("should update league with valid ID and input PATCH /patch", async () => {
    const groupM = await TestDataGenerator.createDummyGroup("Salinas");
    const league = await TestDb.League.create({
      group_id: groupM.id,
      name: "SOMOS",
    });

    const updatedLeagueName = "Sopa Marucha";
    const response = await request(app)
      .patch(`/league/${league.id}`)
      .send({ name: updatedLeagueName });

    expect(response.status).toBe(200);

    const updatedLeague = await TestDb.League.findByPk(league.id);
    expect(updatedLeague.name).toBe(updatedLeagueName);
  });

  it("should return an error if league not found PATCH /patch", async () => {
    const nonExistentLeagueId = "9999";

    const response = await request(app)
      .patch(`/league/${nonExistentLeagueId}`)
      .send({ name: "Joe Mo Mah Inc." });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: "League with given ID was not found",
    });
  });

  it("should not update if the new name is already used in the group", async () => {
    const groupM = await TestDataGenerator.createDummyGroup("Salinas");

    const league1 = await TestDb.League.create({
      group_id: groupM.id,
      name: "Shrek League",
    });
    const league2 = await TestDb.League.create({
      group_id: groupM.id,
      name: "Donkey League",
    });

    const response = await request(app)
      .patch(`/league/${league2.id}`)
      .send({ name: "Shrek League" });

    expect(response.status).toBe(500);
    expect(response.body).toMatchObject({
      message: "Name is not unique",
    });

    const updatedLeague2 = await TestDb.League.findByPk(league2.id);
    expect(updatedLeague2.name).toBe("Donkey League");
  });

  // ------------------- Delete Tests ----------------

  it("should delete a league with a valid league ID DELETE /delete", async () => {
    const groupM = await TestDataGenerator.createDummyGroup("Salinas");
    const league = await TestDb.League.create({
      group_id: groupM.id,
      name: "SOMOS",
    });

    const response = await request(app).delete(`/league/${league.id}`).send();

    expect(response.status).toBe(204);
    expect(await TestDb.League.findByPk(league.id)).toBeNull();
  });

  it("should return an error when attempting to delete a non-existant league DELETE /delete", async () => {
    const response = await request(app).delete("/league/999").send();

    expect(response.status).toBe(404);
  });

  // ------------------------------------------------

  afterEach(async () => {
    await TestDb.Season.destroy({ where: {} });
    await TestDb.Group.destroy({ where: {} });
    await TestDb.League.destroy({ where: {} });
  });

  afterAll(async () => {
    await TestDb.sequelize.close();
  });
});
