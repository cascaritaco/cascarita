"use strict";

const express = require("express");
const router = express.Router();

const passport = require("passport");
const UserController = require("../controllers/user.controller");

router.post(
  "/login",
  passport.authenticate("local", {
    failureMessage: true,
  }),
  UserController.logInUser,
);

router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

router.post("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
