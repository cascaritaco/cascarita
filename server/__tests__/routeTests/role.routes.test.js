"use strict";
window.setImmediate = window.setTimeout;
const request = require("supertest");
const express = require("express");
const RoleRoutes = require("../../routes/role.routes");
const Middlewares = require("../../middlewares.js");
const app = express();
app.use(express.json());
const dummyCheckJwt = (req, res, next) => next();
app.use("/roles", RoleRoutes(dummyCheckJwt));
app.use(Middlewares.errorHandler);

const TestDb = require("../../models");

describe("POST /roles/", () => {
  beforeEach(async function () {
    await TestDb.Role.sync();
  });

  afterEach(async function () {
    await TestDb.Role.destroy({ where: {} });
  });

  it("should create a role", async () => {
    const response = await request(app)
      .post("/roles/")
      .send({ role_type: "admin" });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        role_type: "admin",
      }),
    );
  });
});

afterAll(async () => {
  await TestDb.sequelize.close();
});
