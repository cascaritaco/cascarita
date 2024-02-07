"use strict";

const express = require("express");
const router = express.Router();
const data = require("./data.json");

router.get("/", (req, res) => {
  return res.status(200).json({
    data: data,
  });
});

module.exports = router;
