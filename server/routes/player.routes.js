"use strict";

const express = require("express");
const router = express.Router();
const PlayerController = require("../controllers/player.controller");

router.post("/create", PlayerController.createPlayer);

module.exports = router;
