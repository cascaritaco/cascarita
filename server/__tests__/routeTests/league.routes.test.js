"use strict";

window.setImmediate = window.setTimeout;
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
const testDb = require("../../models");

describe("League Routes", () => {
  beforeEach(async () => {
    await testDb.Group.sync();
    await testDb.League.sync();
    await testDb.Season.sync();
  });

  // ------------------- Get League by Group ID Tests ----------------

  it("should handle GET /getLeagueByGroupId", async () => {
    const groupM = await TestDataGenerator.createDummyGroup("Group Uno");

    await testDb.League.create({ group_id: groupM.id, name: "Leeroy League" });
    await testDb.League.create({
      group_id: groupM.id,
      name: "Martin Martians",
    });

    const response = await request(app).get(`/leagues/${groupM.id}`).send();

    expect(response.status).toBe(200);
    response.body.forEach((season) => expect(season.league_id).toBe(league.id));
  });

  it("should not get any leagues with GET /getLeagueByGroupId", async () => {
    const groupM = await TestDataGenerator.createDummyGroup("Group Uno");

    const response = await request(app).get(`/leagues/${groupM.id}`).send();

    expect(response.status).toBe(404);
  });
});

it("GET /{id}/seasons", async () => {});

// ------------------- Create Tests ----------------

it("should handle POST /create", async () => {
  const groupM = await TestDataGenerator.createDummyGroup("Salinas");

  const response = await request(app)
    .post("/leagues/")
    .send({ group_id: groupM.id, name: "SOMOS" });

  expect(response.status).toBe(201);
  expect(response.body).toEqual(expect.objectContaining({ name: "SOMOS" }));
});

it("should not create if name is not unique POST /create", async () => {
  const groupM = await TestDataGenerator.createDummyGroup("Saul's Group");

  await TestDb.League.create({ group_id: groupM.id, name: "Salinas" });

  const response = await request(app)
    .post("/leagues/")
    .send({ group_id: groupM.id, name: "Salinas" });

  expect(response.status).toBe(400);
  expect(response.body).toMatchObject({
    message: "name is not unique",
  });
});

it("should create a league with the same name from a different group POST /create", async () => {
  const groupUno = await TestDataGenerator.createDummyGroup(
    "Watsonville Corp."
  );
  const groupDos = await TestDataGenerator.createDummyGroup("Salinas Inc.");

  await TestDb.League.create({ group_id: groupUno.id, name: "Summer 2024" });

  const response = await request(app)
    .post("/leagues/")
    .send({ group_id: groupDos.id, name: "Summer 2024" });

  expect(response.status).toBe(201);
  expect(response.body).toEqual(
    expect.objectContaining({ name: "Summer 2024" })
  );
});

// ------------------- Update Tests ----------------

it("should update league with valid ID and input PATCH /patch", async () => {
  const groupM = await TestDataGenerator.createDummyGroup("Salinas");
  const league = await testDb.League.create({
    group_id: groupM.id,
    name: "SOMOS",
  });

  const updatedLeagueName = "Sopa Marucha";
  const response = await request(app)
    .patch(`/leagues/${league.id}`)
    .send({ name: updatedLeagueName });

  expect(response.status).toBe(200);

  const updatedLeague = await TestDb.League.findByPk(league.id);
  expect(updatedLeague.name).toBe(updatedLeagueName);
});

it("should return an error if league not found PATCH /patch", async () => {
  const nonExistentLeagueId = "9999";

  const response = await request(app)
    .patch(`/leagues/${nonExistentLeagueId}`)
    .send({ name: "Joe Mo Mah Inc." });

  expect(response.status).toBe(400);
  expect(response.body).toMatchObject({
    message: "league with given id was not found",
  });
});

it("should not update if the new name is already used in the group", async () => {
  const groupM = await TestDataGenerator.createDummyGroup("Salinas");

  const league1 = await testDb.League.create({
    group_id: groupM.id,
    name: "Shrek League",
  });
  const league2 = await testDb.League.create({
    group_id: groupM.id,
    name: "Donkey League",
  });

  const response = await request(app)
    .patch(`/leagues/${league2.id}`)
    .send({ name: "Shrek League" });

  expect(response.status).toBe(500);
  expect(response.body).toMatchObject({
    message: "name is not unique",
  });

  const updatedLeague2 = await testDb.League.findByPk(league2.id);
  expect(updatedLeague2.name).toBe("Donkey League");
});

// ------------------- Delete Tests ----------------

it("should delete a league with a valid league ID DELETE /delete", async () => {
  const groupM = await TestDataGenerator.createDummyGroup("Salinas");
  const league = await testDb.League.create({
    group_id: groupM.id,
    name: "SOMOS",
  });

  const response = await request(app).delete(`/leagues/${league.id}`).send();

  expect(response.status).toBe(204);
  expect(await TestDb.League.findByPk(league.id)).toBeNull();
});

it("should return an error when attempting to delete a non-existant league DELETE /delete", async () => {
  const response = await request(app).delete("/leagues/999").send();

  expect(response.status).toBe(404);
});

// ------------------------------------------------

afterEach(async () => {
  await testDb.Season.destroy({ where: {} });
  await testDb.League.destroy({ where: {} });
  await testDb.Group.destroy({ where: {} });
});

afterAll(async () => {
  await testDb.sequelize.close();
});
