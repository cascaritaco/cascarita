"use strict";

const { TeamsSession } = require("../models");

const TeamsSessionController = function () {
  var getTeamSessionBySessionId = async function (req, res, next) {
    const sessionId = req.body.id;

    try {
      const result = await TeamsSession.findAll({
        where: {
          session_id: sessionId,
        },
      });

      if (!result) {
        res.status(404);
        throw new Error("Team sessions with given ID do not exist");
      }

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  var createTeamsSession = async function (req, res, next) {
    const { team_id, session_id } = req.body;
    const newTeamSession = { team_id, session_id };

    try {
      await TeamsSession.build(newTeamSession).validate();
      const result = await TeamsSession.create(newTeamSession);

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  var updateTeamsSession = async function (req, res, next) {
    try {
      let currentTeamsSession = await TeamsSession.findOne({
        where: {
          id: req.body.session_id,
        },
      });

      if (!currentTeamsSession) {
        res.status(404);
        throw new Error("Teams session with given ID was not found");
      }

      Object.keys(req.body).forEach((key) => {
        currentTeamsSession[key] = req.body[key]
          ? req.body[key]
          : currentTeamsSession[key];
      });

      await currentTeamsSession.validate();
      await currentTeamsSession.save();

      return res.status(200).json(currentTeamsSession);
    } catch (error) {
      next(error);
    }
  };

  var deleteTeamsSession = async function (req, res, next) {
    try {
      let deletedTeamsSession = await TeamsSession.destroy({
        where: {
          id: req.body.id,
        },
      });

      if (deletedTeamsSession === 0) {
        res.status(404);
        throw new Error("No team session found with the given ID");
      }

      return res.status(204).json("Delete team session successfully");
    } catch (error) {
      next(error);
    }
  };

  return {
    getTeamSessionBySessionId,
    createTeamsSession,
    updateTeamsSession,
    deleteTeamsSession,
  };
};

module.exports = TeamsSessionController();
