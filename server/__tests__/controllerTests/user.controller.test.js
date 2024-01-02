"use strict";

const request = require("supertest");
const UserController = require("../../controllers/user.controller");
const { User } = require("../../models");
const passport = require("passport");
const MockStrategy = require("passport-mock-strategy");

jest.mock("../../models", () => ({
  User: {
    build: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock("passport", () => ({
  authenticate: jest.fn(),
  initialize: jest.fn(),
  use: jest.fn(),
  serializeUser: jest.fn(),
  deserializeUser: jest.fn(),
  _key: "test-key", // Add this line
}));

describe("registerUser", () => {
  it("should create a new user provided valid data", async () => {
    const validateMock = jest.fn();
    User.build.mockReturnValueOnce({ validate: validateMock });

    User.create.mockResolvedValueOnce({
      firstName: "Leo",
      lastName: "Messi",
      email: "user@gmail.com",
      password: "testPassword",
      groupId: 1,
      roleId: 1,
    });

    const req = {
      body: {
        firstName: "Leo",
        lastName: "Messi",
        email: "user@gmail.com",
        password: "testPassword",
        groupId: 1,
        roleId: 1,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await UserController.registerUser(req, res);

    expect(validateMock).toHaveBeenCalled();
    expect(User.create).toHaveBeenCalledWith({
      firstName: "Leo",
      lastName: "Messi",
      email: "user@gmail.com",
      password: "testPassword",
      groupId: 1,
      roleId: 1,
    });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: {
        firstName: "Leo",
        lastName: "Messi",
        email: "user@gmail.com",
        password: "testPassword",
        groupId: 1,
        roleId: 1,
      },
    });
  });

  it("should warn user if they try and use an existing email", async () => {
    const validationError = new Error("Validation error");
    validationError.name = "SequelizeUniqueConstraintError";
    validationError.errors = [
      {
        message: "email must be unique",
        type: "unique violation",
        path: "email",
        value: "user@gmail.com",
        origin: "DB",
        instance: null,
        validatorKey: "not_unique",
        validatorName: null,
        validatorArgs: [],
      },
    ];
    const validateMock = jest.fn().mockRejectedValueOnce(validationError);
    User.build.mockReturnValueOnce({ validate: validateMock });

    const req = {
      body: {
        firstName: "Leo",
        lastName: "Messi",
        email: "user@gmail.com",
        password: "testPassword",
        groupId: 1,
        roleId: 1,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await UserController.registerUser(req, res);

    expect(validateMock).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Validation error",
      details: [
        {
          field: "email",
          message: "email must be unique",
        },
      ],
    });
  });

  it.each([
    ["firstName", null, "notNull Violation: User.firstName cannot be null"],
    ["lastName", null, "notNull Violation: User.lastName cannot be null"],
    ["password", null, "notNull Violation: User.password cannot be null"],
    ["email", null, "notNull Violation: User.email cannot be null"],
    ["groupId", null, "notNull Violation: User.groupId cannot be null"],
    ["roleId", null, "notNull Violation: User.roleId cannot be null"],
  ])(
    "should handle error when %s is null",
    async (fieldName, nullValue, expectedErrorMessage) => {
      const validationError = new Error("Validation error");
      validationError.errors = [
        {
          message: expectedErrorMessage,
          type: "notNull Violation",
          path: fieldName,
        },
      ];

      const validateMock = jest.fn().mockRejectedValueOnce(validationError);
      User.build.mockReturnValueOnce({ validate: validateMock });

      const req = {
        body: {
          firstName: fieldName === "firstName" ? nullValue : "Leo",
          lastName: fieldName === "lastName" ? nullValue : "Messi",
          email: fieldName === "email" ? nullValue : "user@example.com",
          password: fieldName === "password" ? nullValue : "testPassword",
          groupId: fieldName === "groupId" ? nullValue : 1,
          roleId: fieldName === "roleId" ? nullValue : 1,
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await UserController.registerUser(req, res);

      expect(validateMock).toHaveBeenCalled();

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Validation error",
        details: [
          {
            field: fieldName,
            message: expectedErrorMessage,
          },
        ],
      });
    }
  );
});

describe("logInUser", () => {
  it("should log in a user and return a welcome message", async () => {
    const req = {
      body: {
        username: "user@gmail.com",
        password: "testpassword",
      },
    };

    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    const next = jest.fn();

    const user = {
      id: 1,
      firstName: "Leo",
      lastName: "Messi",
    };

    passport._strategies = {};
    passport.authenticate.mockImplementation((strategy, callback) => {
      callback(null, user, null);
    });

    await UserController.logInUser(req, res, next);

    expect(res.json).toHaveBeenCalledWith({ message: "Welcome, Leo Messi" });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(next).not.toHaveBeenCalled();
  });
});
