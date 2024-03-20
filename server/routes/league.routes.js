"use strict";

const express = require("express");
const router = express.Router();
const LeagueController = require("../controllers/league.controller");

router.post("/create", LeagueController.createLeague);
router.get("/getByGroupId", LeagueController.getLeagueByGroupId);

module.exports = router;
