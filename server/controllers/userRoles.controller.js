"use strict";

const { UserRoles } = require("../models");

const UserRolesController = function () {
  var getUserRolesByUserId = async function (req, res, next) {
    const { id } = req.params;

    try {
      const result = await UserRoles.findAll({
        where: {
          user_id: id,
        },
      });

      if (Object.keys(result).length === 0) {
        throw new Error("user with given id has no roles");
      }

      return res.status(200).json(result);
    } catch (error) {
      console.error("Error details:", error);
      next(error);
    }
  };

  var createUserRole = async function (req, res, next) {
    const { user_id, role_id } = req.body;
    const newUserRole = { user_id, role_id };

    try {
      await UserRoles.build(newUserRole).validate();
      const result = await UserRoles.create(newUserRole);

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  var updateUserRole = async function (req, res, next) {
    try {
      const { id } = req.params;

      if (isNaN(id)) {
        res.status(400);
        throw new Error("id must be an integer");
      }

      let currentUserRole = await UserRoles.findByPk(id);

      if (!currentUserRole) {
        res.status(404);
        throw new Error("user roles with given id was not found");
      }

      Object.keys(req.body).forEach((key) => {
        currentUserRole[key] = req.body[key]
          ? req.body[key]
          : currentUserRole[key];
      });

      await currentUserRole.validate();
      await currentUserRole.save();

      return res.status(200).json(currentUserRole);
    } catch (error) {
      next(error);
    }
  };

  var deleteUserRole = async function (req, res, next) {
    try {
      let deletedUserRole = await UserRoles.destroy({
        where: {
          id: req.body.id,
        },
      });

      if (deletedUserRole === 0) {
        res.status(404);
        throw new Error("no user roles found with the given id");
      }

      return res.status(204).json("delete user role successfully");
    } catch (error) {
      console.error("Error details:", error);
      next(error);
    }
  };

  return {
    getUserRolesByUserId,
    createUserRole,
    updateUserRole,
    deleteUserRole,
  };
};

module.exports = UserRolesController();
