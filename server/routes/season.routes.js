"use strict";

const { Router } = require("express");
const SeasonController = require("../controllers/season.controller");

const router = Router();
router.get("/", SeasonController.getAllSeasons);
router.get("/:id", SeasonController.getSeason);
router.get("/:id/league", SeasonController.getSeasonByLeagueId);
router.post("/", SeasonController.createSeason);
router.patch("/:id", SeasonController.updateSeason);
router.delete("/:id", SeasonController.deleteSeason);

module.exports = router;
