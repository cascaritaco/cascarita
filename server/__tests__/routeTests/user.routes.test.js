"use strict";

const request = require("supertest");
const express = require("express");
const UserController = require("../../controllers/user.controller");
const UserRoutes = require("../../routes/user.routes");
const app = express();
app.use("/user", UserRoutes);

jest.mock("../../controllers/user.controller", () => ({
  registerUser: jest.fn(),
  logInUser: jest.fn(),
}));

describe("User Routes", () => {
  it("should handle POST /register", async () => {
    UserController.registerUser.mockImplementation((req, res) => {
      res.status(201).json({
        success: true,
        data: {
          firstName: "Leo",
          lastName: "Messi",
          email: "leoMessi10@gmail.com",
          password: "testPassword",
          groupId: 1,
          roleId: 1,
        },
      });
    });

    const response = await request(app).post("/user/register").send({
      firstName: "Leo",
      lastName: "Messi",
      email: "leoMessi10@gmail.com",
      password: "testPassword",
      groupId: 1,
      roleId: 1,
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      success: true,
      data: {
        firstName: "Leo",
        lastName: "Messi",
        email: "leoMessi10@gmail.com",
        password: "testPassword",
        groupId: 1,
        roleId: 1,
      },
    });
  });
});
