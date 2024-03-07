"use strict";

const express = require("express");
const router = express.Router();
const GameController = require("../controllers/game.controller");

router.get("/getAll", GameController.getGamesBySessionId);

router.get("/getByTeam", GameController.getGamesByTeamId);

router.post("/createGame", GameController.createGame);

router.post("/updateGame", GameController.updateGame);

router.delete("/deleteGame", GameController.deleteGame);

module.exports = router;
