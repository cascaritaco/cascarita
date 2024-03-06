"use strict";

const { Games, Session } = require("../models");

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
      return res.status(500).json({ error: "Session does not exist" });
    }
  };

  return {
    getGamesBySessionId,
  };
};

module.exports = GameController();
