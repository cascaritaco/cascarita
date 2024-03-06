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

  var updateGame = async function (req, res) {
    try {
      let currentGame = await Games.findOne({
        where: {
          id: req.body.id,
        },
      });

      if (!currentGame) {
        return res.status(500).json({ error: "No Game Found" });
      }

      currentGame.session_id = req.body.session_id || currentGame.session_id;
      currentGame.game_date = req.body.game_date || currentGame.game_date;
      currentGame.game_time = req.body.game_time || currentGame.game_time;
      currentGame.away_team_id =
        req.body.away_team_id || currentGame.away_team_id;
      currentGame.away_team_goals =
        req.body.away_team_goals || currentGame.away_team_goals;
      currentGame.home_team_id =
        req.body.home_team_id || currentGame.home_team_id;
      currentGame.home_team_goals =
        req.body.home_team_goals || currentGame.home_team_goals;
      currentGame.winner_id = req.body.winner_id || currentGame.winner_id;
      currentGame.loser_id = req.body.loser_id || currentGame.loser_id;
      currentGame.draw = req.body.draw || currentGame.draw;
      currentGame.game_status_id =
        req.body.game_status_id || currentGame.game_status_id;
      currentGame.field_id = req.body.field_id || currentGame.field_id;
      currentGame.updated_by_id =
        req.body.updated_by_id || currentGame.updated_by_id;
      currentGame.created_by_id =
        req.body.created_by_id || currentGame.created_by_id;

      await currentGame.save();

      return res.status(200).json({ success: true, data: currentGame });
    } catch (error) {
      return res.status(500).json({ error: "Failed to Update Game" });
    }
  };

  var deleteGame = async function (req, res) {
    try {
      let deletedGame = await Games.destroy({
        where: {
          id: req.body.id,
        },
      });

      if (deletedGame === 0) {
        return res
          .status(404)
          .json({ error: "No game found with the given ID" });
      }
      return res.status(200).json();
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete game" });
    }
  };

  return {
    getGamesBySessionId,
    getGamesByTeamId,
    createGame,
    updateGame,
    deleteGame,
  };
};

module.exports = GameController();
