"use strict";

const express = require("express");
const DivisionController = require("../controllers/division.controller");
const router = express.Router();

router.get("/:groupId", DivisionController.getByGroupId);
router.post("/", DivisionController.create);
router.patch("/:id", DivisionController.update);
router.delete("/:id", DivisionController.delete);

module.exports = router;
