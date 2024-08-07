"use strict";

const SessionController = require("../../controllers/session.controller");
const TestDb = require("../../models");
const TestDataGenerator = require("../../utilityFunctions/testDataGenerator");

var createMockResponse = function () {
  return {
    status: jest.fn(function (statusCode) {
      return this;
    }),
    json: jest.fn(function (data) {
      this.body = data;
    }),
  };
};

var setUpForSession = async function (
  groupName,
  LeagueName,
  SeasonName,
  DivisionName,
) {
  const group = await TestDataGenerator.createDummyGroup(groupName);
  const league = await TestDataGenerator.createLeague(LeagueName, group.id);
  const sampleSeason = await TestDataGenerator.createSeason(
    league.id,
    SeasonName,
  );
  const sampleDivision = await TestDataGenerator.createDivision(
    group.id,
    DivisionName,
  );

  return {
    divisionId: sampleDivision.id,
    seasonId: sampleSeason.id,
    groupId: group.id,
  };
};

var createSampleSession = async function () {
  const data = await setUpForSession("group", "league", "season", "division");
  const sampleSession = await TestDb.Session.create({
    division_id: data.divisionId,
    season_id: data.seasonId,
  });
  return { sessionData: sampleSession, groupId: data.groupId };
};

afterAll(async function () {
  await TestDb.sequelize.close();
});

describe("Session Controller", () => {
  beforeEach(async function () {
    await TestDb.Group.sync();
    await TestDb.League.sync();
    await TestDb.Season.sync();
    await TestDb.Division.sync();
    await TestDb.Session.sync();
  });

  afterEach(async function () {
    await TestDb.Session.destroy({ where: {} });
    await TestDb.Division.destroy({ where: {} });
    await TestDb.Season.destroy({ where: {} });
    await TestDb.League.destroy({ where: {} });
    await TestDb.Group.destroy({ where: {} });
  });

  describe("createSession", () => {
    it("should create a new session", async () => {
      const sampleData = await setUpForSession(
        "Dummy Group",
        "Best League",
        "Winter 23",
        "U-18",
      );

      const session = await SessionController.createSession(
        sampleData.divisionId,
        sampleData.seasonId,
      );

      expect(session).toEqual(
        expect.objectContaining({
          division_id: sampleData.divisionId,
          season_id: sampleData.seasonId,
        }),
      );
    });

    it("should handle error during session creation, when passing in an invalid id", async () => {
      const sampleData = await setUpForSession(
        "Big Group",
        "top League",
        "Summer 23",
        "1st",
      );

      await expect(
        SessionController.createSession(
          "not a division lol",
          sampleData.seasonId,
        ),
      ).rejects.toEqual(
        expect.objectContaining({
          name: "SequelizeDatabaseError",
          original: expect.objectContaining({
            sqlMessage:
              "Incorrect integer value: 'not a division lol' for column 'division_id' at row 1",
          }),
        }),
      );
    });

    it("should handle error during session creation, when passing in an unexisting season id", async () => {
      const sampleData = await setUpForSession(
        "Big Group 2",
        "top League 2",
        "Summer 25",
        "2nd",
      );

      await expect(
        SessionController.createSession(sampleData.divisionId, "not a season"),
      ).rejects.toEqual(
        expect.objectContaining({
          name: "SequelizeDatabaseError",
          original: expect.objectContaining({
            sqlMessage:
              "Incorrect integer value: 'not a season' for column 'season_id' at row 1",
          }),
        }),
      );
    });
  });

  describe("updateSession", () => {
    it("update a session successfully", async () => {
      const oldSession = await createSampleSession();
      const newDivision = await TestDataGenerator.createDivision(
        oldSession.groupId,
        "New Division Boi",
      );

      const req = {
        body: {
          session_id: oldSession.sessionData.id,
          division_id: newDivision.id,
          season_id: oldSession.sessionData.season_id,
        },
      };
      const res = createMockResponse();
      const next = jest.fn();

      await SessionController.updateSession(req, res, next);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          division_id: newDivision.id,
          season_id: oldSession.sessionData.season_id,
        }),
      );
    });

    it("should not update a session, if division is not valid", async () => {
      const oldSession = await createSampleSession();
      const badDivision = 6;

      const req = {
        body: {
          session_id: oldSession.sessionData.id,
          division_id: badDivision,
          season_id: oldSession.sessionData.season_id,
        },
      };
      const res = createMockResponse();
      const next = jest.fn();

      await SessionController.updateSession(req, res, next);

      const nextArgs = next.mock.calls[0];
      const caughtError = nextArgs[0];

      expect(next).toHaveBeenCalled();
      expect(caughtError.toString()).toMatch(
        /^SequelizeForeignKeyConstraintError: Cannot add or update a child row:/,
      );
    });

    it("should not update a session, if Session is not valid", async () => {
      const badSession = 5;
      const badDivision = 6;

      const req = {
        body: { session_id: 5, division_id: badDivision, season_id: 4 },
      };
      const res = createMockResponse();
      const next = jest.fn();

      await SessionController.updateSession(req, res, next);

      const nextArgs = next.mock.calls[0];
      const caughtError = nextArgs[0];

      expect(next).toHaveBeenCalled();
      expect(caughtError.toString()).toMatch(
        "Error: session with given id was not found",
      );
    });
  });

  describe("getSessionBySessionId", () => {
    it("returns found Sessions based on the id", async () => {
      const newSession = await createSampleSession();

      const req = { body: { id: newSession.sessionData.id } };
      const res = createMockResponse();
      const next = jest.fn();

      await SessionController.getSessionBySessionId(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          id: newSession.sessionData.id,
        }),
      );
    });

    it("returns error if Sessions id does not exist", async () => {
      const ghostSessionId = 123;

      const req = { body: { id: ghostSessionId } };
      const res = createMockResponse();
      const next = jest.fn();

      await SessionController.getSessionBySessionId(req, res, next);

      const nextArgs = next.mock.calls[0];
      const caughtError = nextArgs[0];

      expect(next).toHaveBeenCalled();
      expect(caughtError.toString()).toMatch(
        "Error: session with given id does not exist",
      );
    });
  });

  describe("getSessionByDivisionId", () => {
    it("returns found Sessions based on the Division id", async () => {
      const newSession = await createSampleSession();

      const req = { body: { division_id: newSession.sessionData.division_id } };
      const res = createMockResponse();
      const next = jest.fn();

      await SessionController.getSessionByDivisionId(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          id: newSession.sessionData.id,
        }),
      );
    });

    it("returns error if Session with a Division id does not exist", async () => {
      const ghostDivisionId = 456;

      const req = { body: { division_id: ghostDivisionId } };
      const res = createMockResponse();
      const next = jest.fn();

      await SessionController.getSessionByDivisionId(req, res, next);

      const nextArgs = next.mock.calls[0];
      const caughtError = nextArgs[0];

      expect(next).toHaveBeenCalled();
      expect(caughtError.toString()).toMatch(
        "Error: session with given division id does not exist",
      );
    });
  });

  describe("deleteSession", () => {
    it("delete a session successfully", async () => {
      const newSession = await createSampleSession();

      const req = { body: { id: newSession.sessionData.id } };
      const res = createMockResponse();
      const next = jest.fn();

      await SessionController.deleteSession(req, res, next);
      expect(res.status).toHaveBeenCalledWith(204);
    });

    it("sends error if a session is not found", async () => {
      const ghostSessionId = 789;

      const req = { body: { id: ghostSessionId } };
      const res = createMockResponse();
      const next = jest.fn();

      await SessionController.deleteSession(req, res, next);

      const nextArgs = next.mock.calls[0];
      const caughtError = nextArgs[0];

      expect(next).toHaveBeenCalled();
      expect(caughtError.toString()).toMatch(
        "Error: no session found with the given id",
      );
    });
  });
});
