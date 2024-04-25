'use strict';

const request = require("supertest");
const SessionController = require("../../controllers/session.controller");
const TestDb = require("../../models");

jest.mock("../../models", () => ({
  Session: {
    findAll: jest.fn(),
    build: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
    destroy: jest.fn()
  },
}));


describe("Session Controller", () => {

    beforeAll(async () => {
        await TestDb.Group.sync();
        await TestDb.League.sync();
        await TestDb.Division.sync();
        await TestDb.Season.sync();
        await TestDb.Session.sync();
    });
    
    afterEach(async function() {
        await TestDb.Group.destroy({ where: {} });
        await TestDb.League.destroy({ where: {} });
        await TestDb.Division.destroy({ where: {} });
        await TestDb.Season.destroy({ where: {} });
        await TestDb.Session.destroy({ where: {} });
    });

  describe("getSessionBySessionId", () => {
    it("should return session data by session ID", async () => {
      const mockSessionData = { id: 1, division_id: 1, season_id: 1 };
      Session.findAll.mockResolvedValueOnce([mockSessionData]);

      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await SessionController.getSessionBySessionId(req, res);

      expect(Session.findAll).toHaveBeenCalledWith({
        where: { id: 1 }
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: [mockSessionData]
      });
    });

    it("should handle error if session with given ID does not exist", async () => {
      Session.findAll.mockResolvedValueOnce([]);

      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      await SessionController.getSessionBySessionId(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error("Session with given ID does not exist"));
    });
  });

  describe("createSession", () => {
    it("should create a new session", async () => {
      const mockRequestBody = { division_id: 1, season_id: 1 };
      const mockSession = { id: 1, ...mockRequestBody };
      Session.build.mockReturnValueOnce({ validate: jest.fn() });
      Session.create.mockResolvedValueOnce(mockSession);

      const req = { body: mockRequestBody };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      await SessionController.createSession(req, res, next);

      expect(Session.build).toHaveBeenCalledWith(mockRequestBody);
      expect(Session.create).toHaveBeenCalledWith(mockRequestBody);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockSession
      });
    });

    it("should handle error during session creation", async () => {
      const mockRequestBody = { division_id: 1, season_id: 1 };
      const mockError = new Error("Validation error");
      Session.build.mockReturnValueOnce({ validate: jest.fn().mockRejectedValueOnce(mockError) });

      const req = { body: mockRequestBody };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      await SessionController.createSession(req, res, next);

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });

  describe("updateSession", () => {
    it("should update an existing session", async () => {
        
        const groupM = await TestDb.Group.create({ name: groupName, street_address: "123 Main Street", city: "Sample City", state: "CA", zip_code: "12345", logo_url: "https://example.com/logo" });
        const leagueM = await TestDb.League.create({ group_id: groupM.id, name: "Sample League", description: "Sample Description" });
        const DivisionM = await TestDb.Division.create({ group_id: groupM.id, name: "Sample Division" });
        const SeasonM = await TestDb.League.create({ name: "Sample Season", start_date: "2024-04-20 00:33:17", end_date: "2024-04-20 00:33:17", is_active: 1, league_id: leagueM.id });
        const SessionM = await TestDb.League.create({ division_id: DivisionM.id, season_id: SeasonM.id });

        const secondDiv = await TestDb.Division.create({ group_id: groupM.id, name: "Second Sample Division" });

        const req = {
            params: { id: SessionM.id },
            body: { division_id: 2 }
          };
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          };
          const next = jest.fn();

        await SessionController.updateSession(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true, data: expect.objectContaining({ id: SessionM.id, division_id: 2, season_id: SeasonM.id }) });
      });
      
  
    it("should handle error if session with given ID does not exist", async () => {
      Session.findOne.mockResolvedValueOnce(null);
  
      const req = { params: { id: 1 }, body: { division_id: 2 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();
  
      await SessionController.updateSession(req, res, next);
  
      expect(next).toHaveBeenCalledWith(new Error("Session with given ID was not found"));
    });
  });
  

  describe("deleteSession", () => {
    it("should delete an existing session", async () => {
      Session.destroy.mockResolvedValueOnce(1);

      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      await SessionController.deleteSession(req, res, next);

      expect(Session.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).toHaveBeenCalledWith({ success: true, message: "Delete session successfully" });
    });

    it("should handle error if no session found with the given ID", async () => {
      Session.destroy.mockResolvedValueOnce(0);

      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      await SessionController.deleteSession(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error("No session found with the given ID"));
    });
  });
});

afterAll(async () => {
    await TestDb.sequelize.close();
});