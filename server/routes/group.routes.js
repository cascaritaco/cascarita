"use strict";

const express = require("express");
const router = express.Router();
const GroupController = require("../controllers/group.controller");

router.get("/:id", GroupController.getGroupById);
router.post("/", GroupController.createGroup);
router.patch("/:id", GroupController.updateGroup);

module.exports = router;
