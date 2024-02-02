"use strict";

const RoleController = require("../../controllers/role.controller");
const { Role } = require("../../models");

jest.mock("../../models", () => ({
  Role: {
    build: jest.fn(),
    create: jest.fn(),
  },
}));

describe("createRole", () => {
  it("should create a new role provided valid data", async () => {
    const validateMock = jest.fn();
    Role.build.mockReturnValueOnce({ validate: validateMock });

    Role.create.mockResolvedValueOnce({
      role_type: "admin",
    });

    const req = {
      body: {
        role_type: "admin",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await RoleController.createRole(req, res);

    expect(validateMock).toHaveBeenCalled();
    expect(Role.create).toHaveBeenCalledWith({
      role_type: "admin",
    });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: {
        role_type: "admin",
      },
    });
  });

  it("should handle error when role_type is null", async () => {
    const validationError = new Error("Validation error");
    validationError.errors = [
      {
        message: "notNull Violation: Role.role_type cannot be null",
        type: "notNull Violation",
        path: "role_type",
      },
    ];

    const validateMock = jest.fn().mockRejectedValueOnce(validationError);
    Role.build.mockReturnValueOnce({ validate: validateMock });

    const req = {
      body: {
        role_type: null,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await RoleController.createRole(req, res);

    expect(validateMock).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Validation error",
      details: [
        {
          field: "role_type",
          message: "notNull Violation: Role.role_type cannot be null",
        },
      ],
    });
  });

  it("should handle error when user tries to create a role_type when the type is already exists", async () => {
    const validationError = new Error("Validation error");
    validationError.errors = [
      {
        message: "role_type must be unique",
        type: "unique violation",
        path: "role_type",
      },
    ];

    const validateMock = jest.fn().mockRejectedValueOnce(validationError);
    Role.build.mockReturnValueOnce({ validate: validateMock });

    const req = {
      body: {
        role_type: "admin",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await RoleController.createRole(req, res);

    expect(validateMock).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Validation error",
      details: [
        {
          field: "role_type",
          message: "role_type must be unique",
        },
      ],
    });
  });
});
