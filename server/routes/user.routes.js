"use strict";

const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const passport = require("passport");

router.get("/loginReactPageHere", (req, res) => {
  res.json({ message: "Invalid email or password, try again" });
});
router.get("/:id", UserController.getUserByUserId);
router.post("/:id/languages", UserController.updateUser);
router.post("/register", UserController.registerUser);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/user/loginReactPageHere",
  }),
  UserController.logInUser,
);
router.post("/email", UserController.sendEmail);
router.post("/verifyOTP", UserController.verifyOTP);

module.exports = router;
