'use strict';

const SessionController = require("../../controllers/session.controller");
const TestDb = require("../../models");
const TestDataGenerator = require("../../utilityFunctions/testDataGenerator");
const express = require("express");
const Middlewares = require("../../middlewares");
const app = express();
app.use(express.json());

app.use(Middlewares.errorHandler);

var createMockResponse = function(){
  return {
    
      status: jest.fn(function (statusCode) {
        return this;
      }),
      json: jest.fn(function (data) {
        this.body = data;
      }),
  }
}

var setUpForSession = async function(groupName, LeagueName, SeasonName, DivisionName){
  const group = await TestDataGenerator.createDummyGroup(groupName);
  const league = await TestDataGenerator.createLeague(LeagueName, group.id);
  const sampleSeason = await TestDataGenerator.createSeason(league.id, SeasonName);
  const sampleDivision = await TestDataGenerator.createDivision(group.id, DivisionName);

  return { divisionId: sampleDivision.id,  seasonId: sampleSeason.id };
}

afterAll(async function() {
  await TestDb.sequelize.close();
});

describe("Session Controller", () => {
  beforeEach(async function() {
        await TestDb.Group.sync();
        await TestDb.League.sync();
        await TestDb.Season.sync();
        await TestDb.Division.sync();
        await TestDb.Session.sync();
    });

    afterEach(async function() {
      await TestDb.Session.destroy({ where: {} });
      await TestDb.Division.destroy({ where: {} });
      await TestDb.Season.destroy({ where: {} });
      await TestDb.League.destroy({ where: {} });
      await TestDb.Group.destroy({ where: {} });
    });

  describe("createSession", () => {
    it("should create a new session", async () => {
      const sampleData = await setUpForSession("Dummy Group","Best League", "Winter 23", "U-18");

      const req = { body: { division_id: sampleData.divisionId, season_id: sampleData.seasonId } };

      const res = createMockResponse();

      const next = jest.fn();

      await SessionController.createSession(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.body.data).toEqual(expect.objectContaining({
        division_id: sampleData.divisionId, 
        season_id:  sampleData.seasonId
      }));
    });

    it("should handle error during session creation, when passing in an invalid id", async () => {
      const sampleData = await setUpForSession("Big Group","top League", "Summer 23", "1st");

      const req = { body: { division_id: "not a division lol", season_id: sampleData.seasonId } };

      const res = createMockResponse();

      const next = jest.fn();

      await SessionController.createSession(req, res, next);

      const nextArgs = next.mock.calls[0];
      const caughtError = nextArgs[0];

      expect(next).toHaveBeenCalled();
      expect(caughtError).toEqual(expect.objectContaining({
        name: "SequelizeDatabaseError", 
        original: expect.objectContaining({
          sqlMessage: "Incorrect integer value: 'not a division lol' for column 'division_id' at row 1"
        })
      }));
    });
  });
});
