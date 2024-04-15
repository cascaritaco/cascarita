"use strict";

const TestDataGenerator = require("../../utilityFunctions/testDataGenerator.js");
const request = require("supertest");
const express = require("express");
const DivisionRoutes = require("../../routes/division.routes");
const Middlewares = require("../../middlewares.js");
const app = express();
app.use(express.json());
app.use("/division", DivisionRoutes);
app.use(Middlewares.errorHandler);
const testDb = require("../../models");

describe("Division Routes", () => {

  beforeEach(async () => {
    await testDb.Group.sync();
    await testDb.Division.sync();
  });

  // ------------------- Get Division by Group ID Tests ----------------

  it("should handle GET /group/:groupId", async () => {
    const group = await TestDataGenerator.createDummyGroup("Group Uno");
    const division1 = await testDb.Division.create({ group_id: group.id, name: "Division 1" });
    const division2 = await testDb.Division.create({ group_id: group.id, name: "Division 2" });

    const response = await request(app)
      .get(`/division/group/${group.id}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it("should not get any divisions with GET /group/:groupId", async () => {
    const group = await TestDataGenerator.createDummyGroup("Group Dos");

    const response = await request(app)
      .get(`/division/group/${group.id}`)
      .send();

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      message: "No divisions found for the given group ID",
    });
  });

  // ------------------- Create Tests ----------------

  it("should handle POST /", async () => {
    const group = await TestDataGenerator.createDummyGroup("Group Tres");

    const response = await request(app)
      .post("/division")
      .send({ group_id: group.id, name: "New Division" });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.objectContaining({ name: "New Division" }));
  });

  it("should not create if name is not unique POST /", async () => {
    const group = await TestDataGenerator.createDummyGroup("Group Cuatro");
    await testDb.Division.create({ group_id: group.id, name: "Duplicate Division" });

    const response = await request(app)
      .post("/division")
      .send({ group_id: group.id, name: "Duplicate Division" });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: 'Division name is already taken.' });
  });

  // ------------------- Update Tests ----------------

  it("should update division with valid ID and input PATCH /:id", async () => {
    const group = await TestDataGenerator.createDummyGroup("Group Cinco");
    const division = await testDb.Division.create({ group_id: group.id, name: "DivisionToUpdate" });

    const updatedDivisionName = "Updated Division";
    const response = await request(app)
      .patch(`/division/${division.id}`)
      .send({ name: updatedDivisionName });

    expect(response.status).toBe(200);

    const updatedDivision = await testDb.Division.findByPk(division.id);
    expect(updatedDivision.name).toBe(updatedDivisionName);
  });

  it("should return an error if division not found PATCH /:id", async () => {
    const nonExistentDivisionId = "9999"; 

    const response = await request(app)
      .patch(`/division/${nonExistentDivisionId}`)
      .send({ name: "Updated Division Name" });

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({ error: 'Division not found' });
  });

  // ------------------- Delete Tests ----------------

  it("should delete a division with a valid division ID DELETE /:id", async () => {
    const group = await TestDataGenerator.createDummyGroup("Group Seis");
    const division = await testDb.Division.create({ group_id: group.id, name: "DivisionToDelete" });

    const response = await request(app)
      .delete(`/division/${division.id}`)
      .send();

    expect(response.status).toBe(204);
    expect(await testDb.Division.findByPk(division.id)).toBeNull();
  });

  it("should return an error when attempting to delete a non-existent division DELETE /:id", async () => {
    const response = await request(app)
      .delete("/division/999")
      .send();

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({ error: 'Division not found' });
  });

  afterEach(async () => {
    await testDb.Division.destroy({ where: {} });
    await testDb.Group.destroy({ where: {} });
  });

  afterAll(async () => {
    await testDb.sequelize.close();
  });
});
