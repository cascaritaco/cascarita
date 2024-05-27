"use strict";
const { Team, Group, Division } = require("./../models");
const TeamsSessionController = require("../controllers/teamSession.controller");

const TeamController = function () {
  var getTeamsByGroupId = async function (req, res, next) {
    const groupId = req.params["id"];

    try {
      const result = await Team.findAll({
        where: {
          group_id: groupId,
        },
      });

      if (Object.keys(result).length === 0) {
        throw new Error("group with given id has no teams");
      }

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  var isNameUniqueWithinDivision = async function (groupId, teamName) {
    let teamFound = await Team.findOne({
      where: {
        group_id: groupId,
        name: teamName,
      },
    });

    return teamFound == null;
  };

  var createTeam = async function (req, res, next) {
    const { group_id, name, team_logo } = req.body;
    const newTeam = { group_id, name, team_logo };

    try {
      const group = await Group.findOne({
        where: {
          id: newTeam.group_id,
        },
      });
      if (!group) {
        res.status(404);
        throw new Error(`no such group with id ${newTeam.group_id}`);
      }

      const teamNameUnique = await isNameUniqueWithinDivision(
        newTeam.group_id,
        newTeam.name
      );

      if (!teamNameUnique) {
        res.status(400);
        throw new Error("team name is not unique within the division");
      }

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
        throw new Error("team with given id was not found");
      }

      if (req.body.name && req.body.name !== currentTeam.name) {
        const nameUnique = await isNameUniqueWithinDivision(
          currentTeam.group_id,
          req.body.name
        );

        if (!nameUnique) {
          res.status(400);
          throw new Error("team name is not unique within the division");
        }
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
        throw new Error("no team found with the given id");
      }

      return res.status(204).json("deleted team successfully");
    } catch (error) {
      next(error);
    }
  };

  return {
    getTeamsByGroupId,
    createTeam,
    updateTeam,
    deleteTeam,
  };
};

module.exports = TeamController();
