"use strict";

const { Router } = require("express");
const UserController = require("../controllers/user.controller.js");
const passport = require("passport");

const router = Router();
router.get("/:id/languages", UserController.getLanguageByUserId);
router.get("/loginReactPageHere", (req, res) => {
  res.json({ message: "Invalid email or password, try again" });
});
router.patch("/:id", UserController.updateLanguagePreference);
router.post("/register", UserController.registerUser);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/user/loginReactPageHere",
  }),
  UserController.logInUser
);

module.exports = router;
