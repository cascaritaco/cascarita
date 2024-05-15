"use strict";
const { Team } = require("./../models");
const TeamsSessionController = require("../controllers/teamSession.controller");

const TeamController = function () {
  var getTeamByGroupId = async function (req, res, next) {
    const groupId = req.params["id"];

    try {
      const result = await Team.findAll({
        where: {
          group_id: groupId,
        },
      });

      if (Object.keys(result).length === 0) {
        throw new Error("Group with given ID has no teams");
      }

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  var getTeamsByLeagueId = async function (req, res, next) {
    const leagueId = req.params["id"];

    try {
      const result = await Team.findAll({
        where: {
          group_id: groupId,
        },
      });

      if (Object.keys(result).length === 0) {
        throw new Error("Group with given ID has no teams");
      }

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  var createTeam = async function (req, res) {
    const { group_id, name, team_logo } = req.body;
    const newTeam = { group_id, name, team_logo };

    try {
      await Team.build(newTeam).validate();
      const result = await Team.create(newTeam);

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  var updateTeam = async function (req, res, next) {
    try {
      let currentTeam = await Team.findOne({
        where: {
          id: req.params["id"],
        },
      });

      if (!currentTeam) {
        res.status(404);
        throw new Error("Team with given ID was not found");
      }

      Object.keys(req.body).forEach((key) => {
        currentTeam[key] = req.body[key] ? req.body[key] : currentTeam[key];
      });

      await currentTeam.validate();
      await currentTeam.save();

      return res.status(200).json(currentTeam);
    } catch (error) {
      next(error);
    }
  };

  var deleteTeam = async function (req, res, next) {
    try {
      let deletedTeam = await Team.destroy({
        where: {
          id: req.params["id"],
        },
      });

      if (deletedTeam === 0) {
        res.status(404);
        throw new Error("No team found with the given ID");
      }

      return res.status(204).json("Deleted team successfully");
    } catch (error) {
      next(error);
    }
  };

  return {
    getTeamByGroupId,
    getTeamsByLeagueId,
    createTeam,
    updateTeam,
    deleteTeam,
  };
};

module.exports = TeamController();
