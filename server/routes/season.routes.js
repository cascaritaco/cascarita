"use strict";

const { Router } = require("express");
const SeasonController = require("../controllers/season.controller");

const router = Router();
router.get("/", SeasonController.getAllSeasons);
router.get("/:id", SeasonController.getSeason);
router.post("/create", SeasonController.createSeason);
router.patch("/update/:id", SeasonController.updateSeason);
router.delete("/delete/:id", SeasonController.deleteSeason);

module.exports = router;
