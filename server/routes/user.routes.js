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
router.post("/register", UserController.registerUser);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/user/loginReactPageHere",
  }),
  UserController.logInUser,
);
router.post("/otp/emails", UserController.sendOtpEmail);
router.post("/forms/emails", UserController.sendFormLinkEmail);
router.post("/otp/verification", UserController.verifyOTP);
router.get("/group/:group_id", UserController.getUsersByGroupId);
router.delete("/:id", UserController.deleteUserById);

module.exports = router;
