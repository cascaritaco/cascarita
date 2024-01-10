"use strict";

const request = require("supertest");
const express = require("express");
const RoleController = require("../../controllers/role.controller");
const RoleRoutes = require("../../routes/role.routes");
const app = express();
app.use(express.json());
app.use("/role", RoleRoutes);

jest.mock("../../controllers/role.controller", () => ({
  createRole: jest.fn(),
}));

describe("Role Routes", () => {
  it("should handle POST /create", async () => {
    RoleController.createRole.mockImplementation((req, res) => {
      res.status(201).json({ success: true, data: { role_type: "admin" } });
    });

    const response = await request(app)
      .post("/role/create")
      .send({ role_type: "admin" });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      success: true,
      data: { role_type: "admin" },
    });
  });
});
