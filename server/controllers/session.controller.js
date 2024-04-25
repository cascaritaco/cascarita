"use strict";

const { Session } = require("../models");

const SessionController = function () {
    var getSessionBySessionId = async function (req, res, next) {
        const sessionId = req.params['id'];

        try {
            const result = await Session.findAll({
            where: {
                id: sessionId,
            },
            });

            if (Object.keys(result).length === 0) {
                throw new Error("Session with given ID does not exist");
            }

            return res.status(200).json({
            success: true,
            data: result,
            });
        } catch (error) {
            next(error);
      }
    };
    
  var getSessionByDivisionId = async function (req, res, next) {
    const divisionId = req.params['id'];

    try {
      const result = await Session.findAll({
        where: {
          division_id: divisionId,
        },
      });

      if (Object.keys(result).length === 0) {
        throw new Error("Session with given division ID does not exist");
      }

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  var createSession = async function (req, res, next) {
    const { division_id, season_id } = req.body;  
    const newSession = { division_id, season_id }; 

    try {
      await Session.build(newSession).validate();
      const result = await Session.create(newSession);

      return res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  var updateSession = async function (req, res, next) {
    try {
      let currentSession = await Session.findOne({
        where: {
          id: req.params['id'],
        },
      });

      console.log("test " + currentSession);
      console.log("bruh")

      console.log(req.params['id']);
      console.log(req.body);

      if (!currentSession) {
        res.status(400);
        throw new Error("Session with given ID was not found");
      }

      Object.keys(req.body).forEach(key => {
            currentSession[key] = req.body[key] ? req.body[key] : currentSession[key];
      });

      console.log(currentSession);

      await currentSession.validate();
      await currentSession.save();

      return res.status(200).json({ success: true, data: currentSession });
    } catch (error) {
      next(error);
    }
  };

  var deleteSession = async function (req, res, next) {
    try {
      let deletedSession = await Session.destroy({
        where: {
          id: req.params['id'],
        },
      });

      if (deletedSession === 0) {
        throw new Error("No session found with the given ID");
       }

      return res.status(204).json({ success: true, message: "Delete session successfully" });
    } catch (error) {
      next(error);
    }
  };

  return {
    getSessionBySessionId,
    getSessionByDivisionId,
    createSession,
    updateSession,
    deleteSession,
  };
};

module.exports = SessionController();