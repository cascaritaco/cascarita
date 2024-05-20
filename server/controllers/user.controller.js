"use strict";

const { User } = require("../models");
const passport = require("passport");

const UserController = function () {
  var isEmailUniqueWithinGroup = async function (groupId, email) {
    let userFound = await User.findOne({
      where: {
        group_id: groupId,
        email: email,
      },
    });

    return userFound == null;
  };

  var registerUser = async function (req, res, next) {
    const {
      first_name,
      last_name,
      email,
      password,
      group_id,
      role_id,
      language_id,
    } = req.body;

    const newUser = {
      first_name,
      last_name,
      email,
      password,
      group_id,
      role_id,
      language_id,
    };

    try {
      const userFound = await isEmailUniqueWithinGroup(
        newUser.group_id,
        newUser.email
      );

      if (!userFound) {
        res.status(400);
        throw new Error("Email is not unique");
      }

      await User.build(newUser).validate();
      const result = await User.create(newUser);

      return res.status(201).json(result);
    } catch (error) {
      next(error);
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
        throw new Error("User id must be an integer");
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
      const { id } = req.params;

      if (isNaN(id)) {
        res.status(400);
        throw new Error("User id must be an integer");
      }

      let currentUser = await User.findByPk(id);

      if (!currentUser) {
        res.status(404);
        throw new Error(`No user was found with id ${id}`);
      }

      currentUser.language_id = req.body.language_id || currentUser.language_id;

      await currentUser.validate();
      await currentUser.save();

      res.json(currentUser);
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
