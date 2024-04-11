"use strict";

const express = require("express");
const router = express.Router();
const LeagueController = require("../controllers/league.controller");

router.post("/", LeagueController.createLeague);
router.get("/:id", LeagueController.getLeagueByGroupId);
router.patch("/:id", LeagueController.updateLeague);
router.delete("/:id", LeagueController.deleteLeague);

module.exports = router;
