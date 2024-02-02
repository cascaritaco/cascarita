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

  it("should handle POST /register with non-unique email", async () => {
    const existingEmail = "existing@example.com";
    UserController.registerUser.mockImplementation((req, res) => {
      res.status(400).json({
        error: "Validation Error",
        details: [
          {
            field: "email",
            message: "unique Violation: User.email must be unique",
          },
        ],
      });
    });

    const response = await request(app).post("/user/register").send({
      firstName: "John",
      lastName: "Doe",
      email: existingEmail,
      password: "testPassword",
      groupId: 1,
      roleId: 1,
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Validation Error",
      details: [
        {
          field: "email",
          message: "unique Violation: User.email must be unique",
        },
      ],
    });
  });

  const fields = [
    "firstName",
    "lastName",
    "email",
    "password",
    "groupId",
    "roleId",
  ];

  it.each(fields)(
    "should handle POST /register with null %s",
    async (field) => {
      UserController.registerUser.mockImplementation((req, res) => {
        res.status(400).json({
          error: "Validation Error",
          details: [
            {
              field: field,
              message: `notNull Violation: User.${field} cannot be null`,
            },
          ],
        });
      });

      const requestBody = {
        firstName: "Leo",
        lastName: "Messi",
        email: "leoMessi10@gmail.com",
        password: "testPassword",
        groupId: 1,
        roleId: 1,
      };

      requestBody[field] = null;

      const response = await request(app)
        .post("/user/register")
        .send(requestBody);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "Validation Error",
        details: [
          {
            field: field,
            message: `notNull Violation: User.${field} cannot be null`,
          },
        ],
      });
    }
  );
});
