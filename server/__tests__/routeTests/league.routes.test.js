"use strict";

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
  });

  it("should handle POST /create", async () => {
    const groupM = await testDb.Group.create({ name: "Salinas" });

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

    let next = jest.fn();

    const groupM = await testDb.Group.create({ name: "Saul's Group" });

    await testDb.League.create({ group_id: groupM.id, name: "Salinas" });

    const response = await request(app)
      .post("/league/")
      .send({ group_id: groupM.id, name: "Salinas" });

    expect(response.status).toBe(500);
    expect(response.body).toMatchObject({
      message: "name is not unique",
    });
  });

  afterEach(async () => {
    await testDb.League.destroy({ where: {} });
    await testDb.Group.destroy({ where: {} });

  });

  afterAll(async () => {
    await testDb.sequelize.close();
  });
});
