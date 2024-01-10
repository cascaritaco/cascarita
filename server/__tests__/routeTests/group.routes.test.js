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
});
