"use strict";

window.setImmediate = window.setTimeout;

const TestDataGenerator = require("../../utilityFunctions/testDataGenerator.js");
const request = require("supertest");
const express = require("express");
const GroupRoutes = require("../../routes/group.routes");
const DivisionRoutes = require("../../routes/division.routes");
const Middlewares = require("../../middlewares");
const { Division, Group, sequelize } = require("../../models");
const app = express();
app.use(express.json());
app.use("/groups", GroupRoutes);
app.use("/divisions", DivisionRoutes);
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
  beforeEach(async () => {
    await Group.sync();
    await Division.sync();
  });

  afterEach(async () => {
    await Division.destroy({ where: {} });
    await Group.destroy({ where: {} });
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

    it("Get divisions by group Id", async () => {
      const group = await TestDataGenerator.createDummyGroup("Group Uno");
      await Division.create({ group_id: group.id, name: "Division 1" });
      await Division.create({ group_id: group.id, name: "Division 2" });

      const response = await request(app).get(`/groups/${group.id}/divisions`);

      expect(response.status).toBe(200);
      response.body.forEach((division) => {
        expect(division.group_id).toBe(group.id);
      });
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

    const updatedGroup = await Group.findByPk(coolGroup.id);
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

    const updatedGroup = await Group.findByPk(coolGroup.id);
    expect(updatedGroup.name).toBe(updatedGroupName);
    expect(updatedGroup.state).toBe(updatedState);
  });
});

afterAll(async () => {
  await sequelize.close();
});
