"use strict";

const express = require("express");
const router = express.Router();
const FormController = require("../controllers/form.controller");

router.post("/", FormController.createForm);
// router.get("/:id", LeagueController.getLeagueByGroupId);
// router.patch("/:id", LeagueController.updateLeague);
// router.delete("/:id", LeagueController.deleteLeague);

module.exports = router;
