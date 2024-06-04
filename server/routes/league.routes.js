"use strict";

const express = require("express");
const router = express.Router();
const LeagueController = require("../controllers/league.controller");
const SeasonController = require("../controllers/season.controller");
const DivisionController = require("../controllers/division.controller");

router.post("/", LeagueController.createLeague);
router.get("/:id", LeagueController.getLeagueByGroupId);
router.get("/:id/seasons", SeasonController.getTeamsByLeagueId);
router.get("/:id/divisions", DivisionController.getUnassociatedDivisions);
router.patch("/:id", LeagueController.updateLeague);
router.delete("/:id", LeagueController.deleteLeague);

module.exports = router;
