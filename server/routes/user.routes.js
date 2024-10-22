"use strict";

const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

module.exports = (checkJwt) => {
  router.get("/loginReactPageHere", (req, res) => {
    res.json({ message: "Invalid email or password, try again" });
  });
  router.get("/:id", UserController.getUserByUserId);
  router.patch("/:id", UserController.updateUserById);
  router.post("/register", UserController.registerUser);

  // router.post("/otp/emails", UserController.sendOtpEmail);
  // router.post("/forms/emails", UserController.sendFormLinkEmail);
  // router.post("/otp/verification", UserController.verifyOTP);
  router.get("/", checkJwt, UserController.fetchUser);

  return router;
};
