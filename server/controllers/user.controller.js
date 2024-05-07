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

  return {
    registerUser,
    logInUser,
  };
};

module.exports = UserController();
