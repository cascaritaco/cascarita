"use strict";

const express = require("express");
const router = express.Router();
const FormController = require("../controllers/form.controller");

router.post("/:group_id/:user_id", FormController.createForm);
router.post("/responses", FormController.createResponse);
router.get("/:form_id/responses", FormController.getResponsesByFormId);
router.get("/:document_id", FormController.getFormByDocumentId);
router.post("/email", FormController.emailForm);
router.patch("/:form_id", FormController.update);
router.delete("/:form_id", FormController.delete);

module.exports = router;
