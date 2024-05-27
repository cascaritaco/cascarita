"use strict";

window.setImmediate = window.setTimeout;

const TestDataGenerator = require("../../utilityFunctions/testDataGenerator.js");
const request = require("supertest");
const express = require("express");
const UserRoutes = require("../../routes/user.routes");
const Middlewares = require("../../middlewares.js");
const app = express();
app.use(express.json());
app.use("/users", UserRoutes);
app.use(Middlewares.errorHandler);
const testDb = require("../../models");

describe("User Routes", () => {
  beforeEach(async () => {
    await testDb.Group.sync();
    await testDb.Role.sync();
    await testDb.Language.sync();
    await testDb.User.sync();
  });

  it("should handle POST /register", async () => {
    const groupM = await TestDataGenerator.createDummyGroup("Salinas");
    const roleM = await testDb.Role.create({
      role_type: "Staff",
    });
    const languageM = await testDb.Language.create({
      language: "English",
    });

    const response = await request(app).post("/users/register/").send({
      first_name: "Leo",
      last_name: "Messi",
      email: "leoMessi10@gmail.com",
      password: "testPassword",
      group_id: groupM.id,
      role_id: roleM.id,
      language_id: languageM.id,
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({ first_name: "Leo" })
    );
  });

  it("should handle POST /register with non-unique email", async () => {
    const groupM = await TestDataGenerator.createDummyGroup("Salinas");
    const roleM = await testDb.Role.create({
      role_type: "Staff",
    });
    const languageM = await testDb.Language.create({
      language: "English",
    });

    const userM = await testDb.User.create({
      first_name: "Leo",
      last_name: "Messi",
      email: "leoMessi10@gmail.com",
      password: "testPassword",
      group_id: groupM.id,
      role_id: roleM.id,
      language_id: languageM.id,
    });

    const response = await request(app).post("/users/register/").send({
      first_name: "Saul",
      last_name: "Reyes",
      email: "leoMessi10@gmail.com",
      password: "password1",
      group_id: groupM.id,
      role_id: roleM.id,
      language_id: languageM.id,
    });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: "email is not unique",
    });
  });

  it("should handle POST /register with an empty first name", async () => {
    const groupM = await TestDataGenerator.createDummyGroup("Salinas");
    const roleM = await testDb.Role.create({
      role_type: "Staff",
    });
    const languageM = await testDb.Language.create({
      language: "English",
    });

    const response = await request(app).post("/users/register/").send({
      first_name: "",
      last_name: "Messi",
      email: "leoMessi10@gmail.com",
      password: "testPassword",
      group_id: groupM.id,
      role_id: roleM.id,
      language_id: languageM.id,
    });

    expect(response.status).toBe(500);
    expect(response.body.message).toContain("Validation error");
  });

  it("should handle POST /register with an empty password", async () => {
    const groupM = await TestDataGenerator.createDummyGroup("Salinas");
    const roleM = await testDb.Role.create({
      role_type: "Staff",
    });
    const languageM = await testDb.Language.create({
      language: "English",
    });

    const response = await request(app).post("/users/register/").send({
      first_name: "Leo",
      last_name: "Messi",
      email: "leoMessi10@gmail.com",
      password: "",
      group_id: groupM.id,
      role_id: roleM.id,
      language_id: languageM.id,
    });

    expect(response.status).toBe(500);
    expect(response.body.message).toContain("Validation error");
  });

  it("Testing updateUser function by updating user's language preference", async () => {
    const groupM = await TestDataGenerator.createDummyGroup("Sample Group");
    const roleM = await testDb.Role.create({
      role_type: "Staff",
    });
    const languageM = await testDb.Language.create({
      language: "English",
    });
    const updatedLanguagePref = await testDb.Language.create({
      language: "Spanish",
    });

    const userM = await testDb.User.create({
      first_name: "Leo",
      last_name: "Messi",
      email: "leoMessi10@gmail.com",
      password: "testPassword",
      group_id: groupM.id,
      role_id: roleM.id,
      language_id: languageM.id,
    });

    const response = await request(app)
      .post(`/users/${userM.id}/languages`)
      .send({ language_id: updatedLanguagePref.id });

    expect(response.status).toBe(200);

    const updatedUser = await testDb.User.findByPk(userM.id);
    expect(updatedUser.language_id).toBe(updatedLanguagePref.id);
  });

  afterEach(async () => {
    await testDb.User.destroy({ where: {} });
    await testDb.Language.destroy({ where: {} });
    await testDb.Role.destroy({ where: {} });
    await testDb.Group.destroy({ where: {} });
  });

  afterAll(async () => {
    await testDb.sequelize.close();
  });
});
