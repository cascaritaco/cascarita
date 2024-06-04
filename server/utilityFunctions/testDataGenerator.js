"use strict";

const TestDb = require("../models");

const testDataGenerator = function () {
  const createDummyGroup = async function (groupName) {
    let newGroupData = {
      name: groupName,
      street_address: "123 Main Street",
      city: "Sample City",
      state: "CA",
      zip_code: "12345",
      logo_url: "https://example.com/logo",
    };
    const sampleGroup = await TestDb.Group.create(newGroupData);
    return sampleGroup;
  };

  const createLeague = async function (leagueName, groupId) {
    let newLeagueData = {
      group_id: groupId,
      name: leagueName,
      description: "This is a dummy league generated for testing purposes",
    };
    const sampleLeague = await TestDb.League.create(newLeagueData);
    return sampleLeague;
  };

  const createSeason = async function (
    leagueId,
    seasonName = "Default Season",
    startDate = new Date(),
    endDate = new Date(),
    isActive = true,
  ) {
    let newSeasonData = {
      name: seasonName,
      start_date: startDate,
      end_date: endDate,
      is_active: isActive,
      league_id: leagueId,
    };

    const sampleSeason = await TestDb.Season.create(newSeasonData);
    return sampleSeason;
  };

  const createDivision = async function (
    groupId,
    divisionName = "Default Division",
  ) {
    let newDivisionData = {
      group_id: groupId,
      name: divisionName,
    };

    const sampleDivision = await TestDb.Division.create(newDivisionData);
    return sampleDivision;
  };

  const createSession = async function () {
    const group = await createDummyGroup("soccer city");
    const league = await createLeague("new league", group.id);
    const season = await createSeason(league.id);
    const division = await createDivision(group.id);
    const session = await TestDb.Session.create({
      division_id: division.id,
      season_id: season.id,
    });

    return { sessionData: session, groupId: group.id };
  };

  return {
    createDummyGroup,
    createLeague,
    createSeason,
    createDivision,
    createSession,
  };
};

module.exports = testDataGenerator();
