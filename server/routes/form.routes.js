"use strict";

const express = require("express");
const router = express.Router();
const FormController = require("../controllers/form.controller");

router.get("/", FormController.getMovie);
router.post("/mov", FormController.createMovie);

module.exports = router;
