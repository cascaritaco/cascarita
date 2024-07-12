"use strict";

const { Router } = require("express");
const SeasonController = require("../controllers/season.controller");
const DivisionController = require("../controllers/division.controller");

const router = Router();
router.get("/", SeasonController.getAllSeasons);
router.get("/:id", SeasonController.getSeason);
router.get("/:id/leagues", SeasonController.getSeasonByLeagueId);
router.get("/:id/divisions", DivisionController.getBySeasonId);
router.post("/", SeasonController.createSeason);
router.patch("/:id", SeasonController.updateSeason);
router.delete("/:id", SeasonController.deleteSeason);

module.exports = router;
