"use strict";

const express = require("express");
const router = express.Router();
const FormController = require("../controllers/form.controller");

router.post("/:id", FormController.createForm);
router.get("/:form_id/responses", FormController.getResponses);

module.exports = router;
