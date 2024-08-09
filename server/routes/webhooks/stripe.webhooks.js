"use strict";

const express = require("express");
const ConnectedAccountController = require("../../controllers/stripeResources/connectedAccount.controller");
const router = express.Router();

router.post("/connect", ConnectedAccountController.handleEvent);

module.exports = router;
