const request = require("supertest");
const { createTeam } = require("../../controllers/team.controller");

jest.mock("./../models", () => ({
  Team: {
    create: jest.fn(),
  },
}));

const { Team } = require("../../models");

describe.skip("createTeam controller", () => {
  it("should create a new team", async () => {
    // Mock Team.create to resolve with a dummy data
    Team.create.mockResolvedValueOnce({
      id: 1,
      name: "TestTeam",
    });

    // Mock Express req and res
    const req = {
      params: {
        name: "TestTeam",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the controller
    await createTeam(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: {
        id: 1,
        name: "TestTeam",
      },
    });

    // Ensure that Team.create was called with the correct parameters
    expect(Team.create).toHaveBeenCalledWith({
      name: "TestTeam",
    });
  });
});
