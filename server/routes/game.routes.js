"use strict";

const express = require("express");
const router = express.Router();
const GameController = require("../controllers/game.controller");

router.get("/getAll", GameController.getGamesBySessionId);

router.get("/getByTeam", GameController.getGamesByTeamId);

router.post("/createGame", GameController.createGame);

module.exports = router;
