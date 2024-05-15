"use strict";

const request = require("supertest");
const express = require("express");
const RoleController = require("../../controllers/role.controller");
const RoleRoutes = require("../../routes/role.routes");
const app = express();
app.use(express.json());
app.use("/roles", RoleRoutes);

jest.mock("../../controllers/role.controller", () => ({
  createRole: jest.fn(),
}));

describe("Role Routes", () => {
  it("should handle POST /create", async () => {
    RoleController.createRole.mockImplementation((req, res) => {
      res.status(201).json({ success: true, data: { role_type: "admin" } });
    });

    const response = await request(app)
      .post("/roles/create")
      .send({ role_type: "admin" });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      success: true,
      data: { role_type: "admin" },
    });
  });

  it("should handle POST /create with null role_type", async () => {
    RoleController.createRole.mockImplementation((req, res) => {
      res.status(400).json({
        error: "Validation Error",
        details: [
          {
            field: "role_type",
            message: "notNull Violation: Role.role_type cannot be null",
          },
        ],
      });
    });

    const response = await request(app)
      .post("/roles/create")
      .send({ role_type: null });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Validation Error",
      details: [
        {
          field: "role_type",
          message: "notNull Violation: Role.role_type cannot be null",
        },
      ],
    });
  });
});
