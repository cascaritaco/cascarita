/**
"use strict";

const request = require("supertest");
const express = require("express");
const LeagueRoutes = require("../../routes/league.routes");
const app = express();
app.use(express.json());
app.use("/league", LeagueRoutes);
const testDb = require("../../models");

describe("League Routes", () => {
  beforeAll(async () => {
    await testDb.sequelize.query("SET FOREIGN_KEY_CHECKS=0");
    await testDb.Group.sync();
    await testDb.League.sync();
  });
  it("should handle POST /create", async () => {
    const groupM = await testDb.Group.create({
      name: "Salinas",
    });

    const response = await request(app).post("/league/create").send({
      group_id: 1,
      name: "SOMOS",
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      success: true,
      data: expect.objectContaining({
        name: "SOMOS",
      }),
    });
  });

  it("should not create if name is not unique  POST /create", async () => {
    await testDb.League.create({
      name: "Salinas",
    });

    const response = await request(app)
      .post("/league/create")
      .send({ name: "Salinas" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Validation error",
      details: [
        {
          field: "name",
          message: "name must be unique",
        },
      ],
    });
  });

  afterAll(async () => {
    await testDb.League.truncate();
    await testDb.Group.truncate();
    await testDb.sequelize.close();
  });
});

*/

"use strict";

const request = require("supertest");
const express = require("express");
const LeagueRoutes = require("../../routes/league.routes");
const app = express();
app.use(express.json());
app.use("/league", LeagueRoutes);
const testDb = require("../../models");

describe("League Routes", () => {
  let currentTransaction;

  beforeEach(async () => {
    // Start a transaction before each test
    //currentTransaction = await testDb.sequelize.transaction();
    await testDb.Group.sync();
    await testDb.League.sync();
  });

  it("should handle POST /create", async () => {
    const groupM = await testDb.Group.create({ name: "Salinas" });

    const response = await request(app)
      .post("/league/create")
      .send({ group_id: groupM.id, name: "SOMOS" });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      success: true,
      data: expect.objectContaining({ name: "SOMOS" }),
    });
  });

  /**
  it("should not create if name is not unique POST /create", async () => {
    await testDb.League.create({ name: "Salinas" });

    const response = await request(app)
      .post("/league/create")
      .send({ name: "Salinas" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Validation error",
      details: [{ field: "name", message: "name must be unique" }],
    });
  });
  */

  afterEach(async () => {
    // Rollback the current transaction if it exists

    await testDb.Group.truncate();
    await testDb.League.truncate();
    await testDb.sequelize.close();
  });

  //   afterAll(async () => {
  //     // Close database connection
  //     await testDb.sequelize.close();
  //   });
});
