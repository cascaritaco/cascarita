"use strict";

const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const passport = require("passport");

router.get("/loginReactPageHere", (req, res) => {
  res.json({ message: "Invalid email or password, try again" });
});
router.get("/:id/languages", UserController.getLanguageByUserId);
router.post("/:id/languages", UserController.updateLanguagePreference);
router.post("/register", UserController.registerUser);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/user/loginReactPageHere",
  }),
  UserController.logInUser
);

module.exports = router;
