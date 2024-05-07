"use strict";

const express = require("express");
const router = express.Router();
const GroupController = require("../controllers/group.controller");
const DivisionController = require("../controllers/division.controller");

router.get("/:id", GroupController.getGroupById);
router.get("/:id/divisions", DivisionController.getByGroupId);
router.post("/", GroupController.createGroup);
router.patch("/:id", GroupController.updateGroup);

module.exports = router;
