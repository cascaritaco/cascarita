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

  var logInUser = function (req, res, next) {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (!user) {
        return res.status(401).json({ error: "Incorrect Credentials" });
      }
      const welcomeMessage = `Welcome, ${user.firstName} ${user.lastName}`;
      res.json({ message: welcomeMessage });
    })(req, res, next);
  };

  return {
    registerUser,
    logInUser,
  };
};

module.exports = UserController();
