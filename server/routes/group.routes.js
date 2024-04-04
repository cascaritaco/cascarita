"use strict";

const express = require("express");
const router = express.Router();
const GroupController = require("../controllers/group.controller");

router.post("/", GroupController.createGroup);

module.exports = router;
