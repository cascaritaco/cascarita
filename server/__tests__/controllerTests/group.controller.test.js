"use strict";

const GroupController = require("../../controllers/group.controller");
const { Group } = require("../../models");

jest.mock("../../models", () => ({
  Group: {
    build: jest.fn(),
    create: jest.fn(),
  },
}));

describe("createGroup", () => {
  it("should create a new group provided valid data", async () => {
    const validateMock = jest.fn();
    Group.build.mockReturnValueOnce({ validate: validateMock });

    Group.create.mockResolvedValueOnce({
      name: "Soccer Central",
    });

    const req = {
      body: {
        name: "Soccer Central",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await GroupController.createGroup(req, res);

    expect(validateMock).toHaveBeenCalled();
    expect(Group.create).toHaveBeenCalledWith({
      name: "Soccer Central",
    });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: {
        name: "Soccer Central",
      },
    });
  });

  it("should handle error when group name is null", async () => {
    const validationError = new Error("Validation error");
    validationError.errors = [
      {
        message: "notNull Violation: Group.name cannot be null",
        type: "notNull Violation",
        path: "name",
      },
    ];

    const validateMock = jest.fn().mockRejectedValueOnce(validationError);
    Group.build.mockReturnValueOnce({ validate: validateMock });

    const req = {
      body: {
        name: null,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await GroupController.createGroup(req, res);

    expect(validateMock).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Validation error",
      details: [
        {
          field: "name",
          message: "notNull Violation: Group.name cannot be null",
        },
      ],
    });
  });

  it("should handle error when user tries to create a group when the name is already taken", async () => {
    const validationError = new Error("Validation error");
    validationError.errors = [
      {
        message: "name must be unique",
        type: "unique violation",
        path: "name",
      },
    ];

    const validateMock = jest.fn().mockRejectedValueOnce(validationError);
    Group.build.mockReturnValueOnce({ validate: validateMock });

    const req = {
      body: {
        name: "Soccer Central",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await GroupController.createGroup(req, res);

    expect(validateMock).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Validation error",
      details: [
        {
          field: "name",
          message: "name must be unique",
        },
      ],
    });
  });
});
