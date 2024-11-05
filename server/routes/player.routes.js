"use strict";

const express = require("express");
const router = express.Router();
const PlayerController = require("../controllers/player.controller");

module.exports = (checkJwt) => {
  router.post("/create", PlayerController.createPlayer);
  return router;
};
