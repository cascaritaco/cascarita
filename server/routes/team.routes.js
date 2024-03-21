"use strict";

const express = require("express");
const router = express.Router();
const TeamController = require("../controllers/team.controller");

router.post("/create", TeamController.createTeam);

module.exports = router;
