"use strict";

const TestDataGenerator = require("../../utilityFunctions/testDataGenerator.js");
const request = require("supertest");
const express = require("express");
const GroupRoutes = require("../../routes/group.routes");
const Middlewares = require("../../middlewares");
const TestDb = require("../../models");
const app = express();
app.use(express.json());
app.use("/groups", GroupRoutes);
app.use(Middlewares.errorHandler);

const sampleGroup = {
  name: "Sample Group",
  street_address: "123 Main Street",
  city: "Sample City",
  state: "CA",
  zip_code: "12345",
  logo_url: "https://example.com/logo",
};

const sampleErrorGroup = {
  name: "Sample Group",
  street_address: "123 Main Street",
  city: "Sample City",
  state: "01",
  zip_code: "12345",
  logo_url: "https://example.com/logo",
};

describe("Integration Tests for Group", () => {
  beforeEach(async function () {
    await TestDb.Group.sync();
  });

  afterEach(async function () {
    await TestDb.Group.destroy({ where: {} });
  });

  // ---------------- GET ----------------

  describe("GET/ Group routes", () => {
    it("successful GET of group information", async () => {
      const coolGroup = await TestDataGenerator.createDummyGroup("Sample Group");

      const response = await request(app).get(`/groups/${coolGroup.id}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(
        expect.objectContaining({
          name: "Sample Group",
        }),
      );
    });

    it("returns an error when attempting to retrieve non-existent group", async () => {
      const missingGroup = { id: 12345 };
      const response = await request(app).get(`/groups/${missingGroup.id}`);

      expect(response.status).toBe(500);
      expect(response.body).toEqual(
        expect.objectContaining({
          message: "Group with given ID was not found",
        }),
      );
    });
  });

  // ---------------- CREATE ----------------

  describe("POST/ Group routes", () => {
    it("successful POST when creating a new group", async () => {
      const response = await request(app).post("/groups/").send(sampleGroup);

      expect(response.status).toBe(201);
      expect(response.body.data).toEqual(
        expect.objectContaining({
          name: "Sample Group",
          city: "Sample City",
        }),
      );
    });

    it("error POST when creating a new group with the same name", async () => {
      const coolGroup = await TestDataGenerator.createDummyGroup("Sample Group");

      const response = await request(app).post("/groups/").send(sampleGroup);

      expect(response.status).toBe(500);
      expect(response.body).toMatchObject({
        message: "Validation error",
      });
    });

    it("error POST when creating a new group with a bad state name", async () => {
      const response = await request(app).post("/groups/").send(sampleErrorGroup);

      expect(response.status).toBe(500);
      expect(response.body).toMatchObject({
        message: "Validation error: Invalid state abbreviation",
      });
    });
  });

  // ---------------- UPDATE ----------------

  it("should PATCH group with valid ID and input", async () => {
    const coolGroup = await TestDataGenerator.createDummyGroup("Sample Group");

    const updatedGroupName = "Updated Sample Group";
    const response = await request(app)
      .patch(`/groups/${coolGroup.id}`)
      .send({ name: updatedGroupName });

    expect(response.status).toBe(200);

    const updatedGroup = await TestDb.Group.findByPk(coolGroup.id);
    expect(updatedGroup.name).toBe(updatedGroupName);
  });

  it("should PATCH group with valid ID and input for state", async () => {
    const coolGroup = await TestDataGenerator.createDummyGroup("Sample Group");

    const updatedGroupName = "Updated New York Sample Group";
    const updatedState = "NY";
    const response = await request(app)
      .patch(`/groups/${coolGroup.id}`)
      .send({ name: updatedGroupName, state: updatedState });

    expect(response.status).toBe(200);

    const updatedGroup = await TestDb.Group.findByPk(coolGroup.id);
    expect(updatedGroup.name).toBe(updatedGroupName);
    expect(updatedGroup.state).toBe(updatedState);
  });
});

afterAll(async () => {
  await TestDb.sequelize.close();
});
