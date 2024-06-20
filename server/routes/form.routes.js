"use strict";

const express = require("express");
const router = express.Router();
const FormController = require("../controllers/form.controller");

router.post("/:group_id/:user_id", FormController.createForm);
router.get("/:form_id/responses", FormController.getResponses);
router.get("/:document_id", FormController.getFormByDocumentId);
module.exports = router;
