"use strict";

const request = require("supertest");
const express = require("express");
const GroupController = require("../../controllers/group.controller");
const GroupRoutes = require("../../routes/group.routes");
const Middlewares = require("../../middlewares");
const TestDb = require("../../models");
const app = express();
app.use(express.json());
app.use("/group", GroupRoutes);
app.use(Middlewares.errorHandler);

const sampleGroup = {
  name: "Sample Group",
  street_address: "123 Main Street",
  city: "Sample City",
  state: "CA",
  zip_code: "12345",
  logo_url: "https://example.com/logo",
};

const commonBeforeEach = async function() {
  await TestDb.Group.sync();
};

const commonAfterEach = async function() {
  await TestDb.Group.destroy({ where: {} });
};

describe("GET/ Group routes", () => {
  beforeEach(commonBeforeEach);
  afterEach(commonAfterEach);

  it("successful GET of group information", async () => {
    const coolGroup = await TestDb.Group.create(sampleGroup);
    const response = await request(app)
      .get(`/group/${coolGroup.id}`)

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(expect.objectContaining({
      name: "Sample Group",
      city: "Sample City"
    }));
  });

  it("returns an error when attempting to retrieve non-existent group", async () => {
    const missingGroup = {id: 12345}
    const response = await request(app)
      .get(`/group/${missingGroup.id}`)

    expect(response.status).toBe(500);
    expect(response.body).toEqual(expect.objectContaining({
      message: "Group with given ID was not found",
    }));
  });
});

describe("POST/ Group routes", () => {
  beforeEach(commonBeforeEach);
  afterEach(commonAfterEach);

  it("successful POST when creating a new group", async () => {
    const response = await request(app)
      .post("/group/").send(sampleGroup)

    expect(response.status).toBe(201);
    expect(response.body.data).toEqual(expect.objectContaining({
      name: "Sample Group",
      city: "Sample City"
    }));
  });
});

afterAll(async () => {
  await TestDb.sequelize.close();
});