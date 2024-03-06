"use strict";

const { Games, Session } = require("../models");
const { Op } = require("sequelize");

const GameController = function () {
  var getGamesBySessionId = async function (req, res) {
    const sessionId = req.body.session_id;
    const session = await Session.findOne({
      where: {
        id: sessionId,
      },
    });

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    try {
      const result = await Games.findAll({
        where: {
          session_id: sessionId,
        },
      });

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch matches" });
    }
  };

  var getGamesByTeamId = async function (req, res) {
    const teamId = req.body.team_id;
    const sessionId = req.body.session_id;
    try {
      const result = await Games.findAll({
        where: {
          session_id: sessionId,
          [Op.or]: [{ away_team_id: teamId }, { home_team_id: teamId }],
        },
      });

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch matches" });
    }
  };

  var createGame = async function (req, res) {
    const newGame = {
      session_id: req.body.session_id,
      game_date: req.body.game_date,
      game_time: req.body.game_time,
      away_team_id: req.body.away_team_id,
      away_team_goals: req.body.away_team_goals,
      home_team_id: req.body.home_team_id,
      home_team_goals: req.body.home_team_goals,
      winner_id: req.body.winner_id,
      loser_id: req.body.loser_id,
      draw: req.body.draw,
      game_status_id: req.body.game_status_id,
      field_id: req.body.field_id,
      updated_by_id: req.body.updated_by_id,
      created_by_id: req.body.created_by_id,
    };

    try {
      await Games.build(newGame).validate();
      const result = await Games.create(newGame);
      console.log(result);

      return res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      const validationErrors = error.errors?.map((err) => ({
        field: err.path,
        message: err.message,
      }));

      return res
        .status(400)
        .json({ error: "Validation error", details: validationErrors });
    }
  };

  return {
    getGamesBySessionId,
    getGamesByTeamId,
    createGame,
  };
};

module.exports = GameController();
