"use strict";

require("dotenv").config();
const express = require("express");
const AccountController = require("../controllers/account.controller");
const router = express.Router();

router.post("/connect", AccountController.createAccountConnection);
router.post(
  "/:account_id/paymentIntent",
  AccountController.createPaymentIntent,
);
router.get(
  "/:account_id/paymentIntent/:paymentIntentId",
  AccountController.getClientSecret,
);

module.exports = router;
