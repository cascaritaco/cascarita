"use strict";
const { Role } = require("../models");

const RoleController = function () {
  var createRole = async function (req, res) {
    const newRole = {
      role_type: req.body.role_type,
    };

    try {
      await Role.build(newRole).validate();
      const result = await Role.create(newRole);

      return res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      const validationErrors = error.errors?.map((err) => ({
        field: err.path,
        message: err.message,
      }));

      return res
        .status(400)
        .json({ error: "Validation error", details: validationErrors });
    }
  };

  return {
    createRole,
  };
};

module.exports = RoleController();
