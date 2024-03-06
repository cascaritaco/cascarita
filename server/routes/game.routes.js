"use strict";

const express = require("express");
const router = express.Router();
const GameController = require("../controllers/game.controller");

router.get("/get", GameController.getGamesBySessionId);
// update
// create
// delete
// archive = store in histroy table
module.exports = router;
