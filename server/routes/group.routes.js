"use strict";

const express = require("express");
const router = express.Router();
const GroupController = require("../controllers/group.controller");
const DivisionController = require("../controllers/division.controller");
const FieldController = require("../controllers/field.controller");
const LeagueController = require("../controllers/league.controller");

router.get("/:id", GroupController.getGroupById);
router.get("/:id/divisions", DivisionController.getByGroupId);
router.get("/:id/fields", FieldController.getFieldByGroupId);
router.get("/:id/leagues", LeagueController.getLeagueByGroupId);
router.post("/", GroupController.createGroup);
router.patch("/:id", GroupController.updateGroup);

module.exports = router;
