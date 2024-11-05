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
  router.get("/", checkJwt, UserController.fetchUser);
  router.get("/group/:group_id", UserController.getUsersByGroupId);
  router.delete("/:id", UserController.deleteUserById);
  router.patch("/:id", UserController.updateUserById);
  router.post("/", UserController.addUser);
  return router;
};
