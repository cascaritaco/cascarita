"use strict";

const express = require("express");
const router = express.Router();
const TeamController = require("../controllers/team.controller");

router.get("/group/:id", TeamController.getTeamByGroupId);
router.post("/", TeamController.createTeam);
router.patch("/:id", TeamController.updateTeam);
router.delete("/:id", TeamController.deleteTeam);

module.exports = router;
