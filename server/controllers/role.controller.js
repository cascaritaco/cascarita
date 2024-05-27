"use strict";
const { Role } = require("../models");

const RoleController = function () {
  var isRoleUnique = async function (role) {
    let foundRole = await Role.findOne({
      where: {
        role_type: role,
      },
    });

    return foundRole == null;
  };

  var createRole = async function (req, res, next) {
    const newRole = {
      role_type: req.body.role_type,
    };

    try {
      if (!newRole.role_type) {
        res.status(400);
        throw new Error("role type is required");
      }

      const foundRole = await isRoleUnique(newRole.role_type);

      if (!foundRole) {
        res.status(400);
        throw new Error("role type is not unique");
      }

      await Role.build(newRole).validate();
      const result = await Role.create(newRole);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  return {
    createRole,
  };
};

module.exports = RoleController();
