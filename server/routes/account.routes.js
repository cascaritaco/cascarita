"use strict";

require("dotenv").config();
const express = require("express");
const AccountController = require("../controllers/account.controller");
const router = express.Router();

router.post("/connect", AccountController.createAccountConnection);

module.exports = router;
