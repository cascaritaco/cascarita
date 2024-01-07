"use strict";

const { User } = require("../models");
const passport = require("passport");

const UserController = function () {
  var registerUser = async function (req, res) {
    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      groupId: req.body.groupId,
      roleId: req.body.roleId,
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
      return res.status(401).json({ message: "Incorrect Credentials" });
    }
    const welcomeMessage = `Welcome, ${req.user.firstName} ${req.user.lastName}`;
    res.status(200).json({ message: welcomeMessage });
  };

  return {
    registerUser,
    logInUser,
  };
};

module.exports = UserController();
