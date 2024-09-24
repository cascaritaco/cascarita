"use strict";

const express = require("express");
const router = express.Router();
const RoleController = require("../controllers/role.controller");

module.exports = (checkJwt) => {
  router.post("/", RoleController.createRole);
  return router;
};
