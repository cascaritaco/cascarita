"use strict";

const { User } = require("../models");
const passport = require("passport");
const GroupController = require("./group.controller");

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
      role_id,
      language_id,
      group_id,
      name,
      street_address,
      city,
      state,
      zip_code,
      logo_url,
    } = req.body;

    let groupId = group_id;

    if (!group_id) {
      try {
        const newGroup = {
          name,
          street_address,
          city,
          state,
          zip_code,
          logo_url,
        };

        groupId = await GroupController.createGroup(newGroup);
      } catch (error) {
        next(error);
      }
    }

    const newUser = {
      first_name,
      last_name,
      email,
      password,
      role_id,
      language_id,
      group_id: groupId,
    };

    try {
      const userFound = await isEmailUniqueWithinGroup(
        newUser.group_id,
        newUser.email,
      );

      if (!userFound) {
        res.status(400);
        throw new Error("email is not unique");
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
      return res.status(401).json({ message: "unauthorized" });
    }
    res.status(200).json({ user: req.user });
  };

  var getUserByUserId = async function (req, res, next) {
    try {
      const { id } = req.params;

      if (isNaN(id)) {
        res.status(400);
        throw new Error("user id must be an integer");
      }

      const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
      });
      if (!user) {
        res.status(404);
        throw new Error(`no user was found with id ${id}`);
      }

      return res.json(user);
    } catch (error) {
      next(error);
    }
  };

  var updateUser = async function (req, res, next) {
    try {
      const { id } = req.params;

      if (isNaN(id)) {
        res.status(400);
        throw new Error("user id must be an integer");
      }

      let currentUser = await User.findByPk(id);

      if (!currentUser) {
        res.status(404);
        throw new Error(`no user was found with id ${id}`);
      }

      Object.keys(req.body).forEach((key) => {
        currentUser[key] = req.body[key] ? req.body[key] : currentUser[key];
      });

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
    getUserByUserId,
    updateUser,
  };
};

module.exports = UserController();
