"use strict";

const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const passport = require("passport");

router.get("/loginReactPageHere", (req, res) => {
  res.json({ message: "Invalid email or password, try again" });
});
router.get("/:id", UserController.getUserByUserId);
router.patch("/:id", UserController.updateUserById);
router.patch("/", UserController.updateUserByEmail);
router.post("/register", UserController.registerUser);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/user/loginReactPageHere",
  }),
  UserController.logInUser,
);
router.post("/otpEmail", UserController.sendOtpEmail);
router.post("/formEmail", UserController.sendFormLinkEmail);
router.post("/verifyOTP", UserController.verifyOTP);

module.exports = router;
