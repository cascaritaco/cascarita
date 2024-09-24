"use strict";

const express = require("express");
const router = express.Router();
const FieldController = require("../controllers/field.controller");

module.exports = (checkJwt) => {
  router.post("/", FieldController.createField);
  router.patch("/:id", FieldController.updateField);
  router.delete("/:id", FieldController.deleteField);

  return router;
};
