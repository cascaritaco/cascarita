"use strict";

const express = require("express");
const router = express.Router();
const FormController = require("../controllers/form.controller");

router.post("/:group_id/:user_id", FormController.createForm);
router.post("/:form_id/user/:user_id", FormController.updateForm);
router.get("/:form_id/responses", FormController.getResponses);

module.exports = router;
