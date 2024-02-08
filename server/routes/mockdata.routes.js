"use strict";

const express = require("express");
const router = express.Router();
const standingsData = require("./../data/standings_data.json");
const matchesData = require("./../data/matches_data.json");

router.get("/standings", (req, res) => {
  return res.status(200).json({
    data: standingsData,
  });
});

router.get("/matches", (req, res) => {
  return res.status(200).json({
    data: matchesData,
  });
});

module.exports = router;
