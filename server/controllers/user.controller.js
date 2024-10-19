"use strict";

const { User, AuthCode } = require("../models");
const passport = require("passport");
const GroupController = require("./group.controller");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { request } = require("http");
const { group } = require("console");
const getUserInfoFromAuth0 = require("../utilityFunctions/auth0");

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
    const { address, city, state, zip_code, organization } = req.body;

    const authorization = req.headers.authorization;

    const userBasicInfo = await getUserInfoFromAuth0(authorization);

    let groupId;
    const groups = await GroupController.getGroupByName(organization);
    groupId = groups[0].id;

    if (!groupId) {
      try {
        const newGroup = {
          name: organization,
          street_address: address,
          city,
          state,
          zip_code,
          logo_url: null,
        };

        groupId = await GroupController.createGroup(newGroup);
      } catch (error) {
        next(error);
      }
    }
    const first_name =
      userBasicInfo.given_name ||
      (userBasicInfo.name ? userBasicInfo.name.split(" ")[0] : "");

    const last_name =
      userBasicInfo.family_name ||
      (userBasicInfo.name
        ? userBasicInfo.name.split(" ").slice(1).join(" ")
        : "");

    const newUser = {
      first_name: first_name,
      last_name: last_name,
      email: userBasicInfo.email,
      picture: userBasicInfo.picture,
      role_id: 1,
      language_id: 1,
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

      const user = await User.findByPk(id);
      if (!user) {
        res.status(404);
        throw new Error(`no user was found with id ${id}`);
      }

      return res.json(user);
    } catch (error) {
      next(error);
    }
  };

  var updateUserById = async function (req, res, next) {
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

  var fetchUser = async function (req, res, next) {
    try {
      // Access the email from the query parameters
      const email = req.query.email;
      console.log("email: ", email);

      let user = await User.findOne({
        where: {
          email: email,
        },
      });

      console.log("user: ", user);

      if (user) {
        return res.status(200).json(user);
      } else {
        console.log("NOT FOUND HERE!");
        // TODO Not the best practice below. Was previously .status(404)
        return res.json({
          message: `User with email: '${email}' not found.`,
          authorization: req.headers.authorization,
          isSigningUp: true,
        });
      }
    } catch (error) {
      console.error("Failed to fetch existing user:", error);
      next(error);
    }
  };

  return {
    registerUser,
    logInUser,
    getUserByUserId,
    updateUserById,
    fetchUser,
  };
};

module.exports = UserController();
