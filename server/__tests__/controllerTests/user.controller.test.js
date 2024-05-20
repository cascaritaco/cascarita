"use strict";

const request = require("supertest");
const UserController = require("../../controllers/user.controller");
const { User } = require("../../models");
const passport = require("passport");

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

describe.skip("registerUser UNUSED", () => {
  it("should create a new user provided valid data", async () => {
    const validateMock = jest.fn();
    User.build.mockReturnValueOnce({ validate: validateMock });

    User.create.mockResolvedValueOnce({
      first_name: "Leo",
      last_name: "Messi",
      email: "user@gmail.com",
      password: "testPassword",
      group_id: 1,
      role_id: 1,
    });

    const req = {
      body: {
        first_name: "Leo",
        last_name: "Messi",
        email: "user@gmail.com",
        password: "testPassword",
        group_id: 1,
        role_id: 1,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await UserController.registerUser(req, res);

    expect(validateMock).toHaveBeenCalled();
    expect(User.create).toHaveBeenCalledWith({
      first_name: "Leo",
      last_name: "Messi",
      email: "user@gmail.com",
      password: "testPassword",
      group_id: 1,
      role_id: 1,
    });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: {
        first_name: "Leo",
        last_name: "Messi",
        email: "user@gmail.com",
        password: "testPassword",
        group_id: 1,
        role_id: 1,
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
        first_name: "Leo",
        last_name: "Messi",
        email: "user@gmail.com",
        password: "testPassword",
        group_id: 1,
        role_id: 1,
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
    ["first_name", null, "notNull Violation: User.first_name cannot be null"],
    ["last_name", null, "notNull Violation: User.last_name cannot be null"],
    ["password", null, "notNull Violation: User.password cannot be null"],
    ["email", null, "notNull Violation: User.email cannot be null"],
    ["group_id", null, "notNull Violation: User.group_id cannot be null"],
    ["role_id", null, "notNull Violation: User.role_id cannot be null"],
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
          first_name: fieldName === "first_name" ? nullValue : "Leo",
          last_name: fieldName === "last_name" ? nullValue : "Messi",
          email: fieldName === "email" ? nullValue : "user@example.com",
          password: fieldName === "password" ? nullValue : "testPassword",
          group_id: fieldName === "group_id" ? nullValue : 1,
          role_id: fieldName === "role_id" ? nullValue : 1,
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
  it("should return 200 status for an authenticated user", async () => {
    const req = {
      user: {
        first_name: "Leo",
        last_name: "Messi",
        username: "user@gmail.com",
        password: "testpassword",
      },
    };

    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await UserController.logInUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should return a error message for an UNauthenticated user", async () => {
    const req = {
      user: null,
    };

    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await UserController.logInUser(req, res);

    expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized" });
    expect(res.status).toHaveBeenCalledWith(401);
  });
});
