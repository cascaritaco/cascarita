"use strict";

const request = require("supertest");
const express = require("express");
const GroupController = require("../../controllers/group.controller");
const GroupRoutes = require("../../routes/group.routes");
const app = express();
app.use(express.json());
app.use("/group", GroupRoutes);

jest.mock("../../controllers/group.controller", () => ({
  createGroup: jest.fn(),
}));

describe("Group Routes", () => {
  it("should handle POST /create", async () => {
    GroupController.createGroup.mockImplementation((req, res) => {
      res.status(201).json({ success: true, data: { name: "TestGroup" } });
    });

    const response = await request(app)
      .post("/group/create")
      .send({ name: "TestGroup" });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      success: true,
      data: { name: "TestGroup" },
    });
  });

  it("should handle POST /create with null name", async () => {
    GroupController.createGroup.mockImplementation((req, res) => {
      res.status(400).json({
        error: "Validation Error",
        details: [
          {
            field: "name",
            message: "notNull Violation: Group.name cannot be null",
          },
        ],
      });
    });

    const response = await request(app)
      .post("/group/create")
      .send({ name: null });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Validation Error",
      details: [
        {
          field: "name",
          message: "notNull Violation: Group.name cannot be null",
        },
      ],
    });
  });

  it("should handle POST /create with non unique name", async () => {
    GroupController.createGroup.mockImplementation((req, res) => {
      res.status(400).json({
        error: "Validation Error",
        details: [
          {
            field: "name",
            message: "name must be unique",
          },
        ],
      });
    });

    const response = await request(app)
      .post("/group/create")
      .send({ name: "Soccer Central" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Validation Error",
      details: [
        {
          field: "name",
          message: "name must be unique",
        },
      ],
    });
  });
});
