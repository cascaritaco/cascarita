"use strict";

require("dotenv").config();
const express = require("express");
const router = express.Router();

router.get("/stripe-oauth", function (req, res) {
  try {
    const redirectUrl = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.STRIPE_CLIENT_ID}&scope=read_write`;
    res.json({ redirectUrl });
  } catch (error) {
    console.error("error handling stripe oauth request:", error);
    res.status(500).json({ message: "internal server error" });
  }
});

module.exports = router;
