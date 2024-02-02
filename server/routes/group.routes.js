"use strict";

const express = require("express");
const router = express.Router();
const GroupController = require("../controllers/group.controller");

router.post("/create", GroupController.createGroup);

module.exports = router;
