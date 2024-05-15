"use strict";

const { User } = require("../models");
const passport = require("passport");

const UserController = function () {
  var registerUser = async function (req, res) {
    const newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      group_id: req.body.group_id,
      role_id: req.body.role_id,
      language_id: req.body.language_id,
    };

    try {
      await User.build(newUser).validate();
      const result = await User.create(newUser);

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

  var logInUser = function (req, res) {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(200).json({ user: req.user });
  };

  var getLanguageByUserId = async function (req, res, next) {
    try {
      const { id } = req.params;
      if (isNaN(id)) {
        res.status(400);
        throw new Error("season id must be an integer");
      }

      const user = await User.findByPk(id);
      if (!user) {
        res.status(404);
        throw new Error(`No user was found with id ${id}`);
      }

      return res.json(user.language_id);
    } catch (error) {
      next(error);
    }
  };

  var updateLanguagePreference = async function (req, res, next) {
    try {
      let currentUser = await User.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!currentUser) {
        res.status(404);
        throw new Error("User with given ID was not found");
      }

      currentUser.language_id = req.body.language_id || currentUser.language_id;

      await currentUser.validate();
      await currentUser.save();

      return res.status(200).json(currentUser);
    } catch (error) {
      next(error);
    }
  };

  return {
    registerUser,
    logInUser,
    getLanguageByUserId,
    updateLanguagePreference,
  };
};

module.exports = UserController();
