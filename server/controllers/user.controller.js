"use strict";

const { User } = require("../models");
const GroupController = require("./group.controller");
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
    const { group_id, name, streetAddress, city, state, zipCode, logoUrl } =
      req.body;

    const userBasicInfo = await getUserInfoFromAuth0(req.headers.authorization);

    let groupId = group_id;
    // const groups = await GroupController.getGroupByName(name);
    // groupId = groups[0].id;

    if (!groupId) {
      try {
        const newGroup = {
          name: name,
          street_address: streetAddress,
          city,
          state,
          zip_code: zipCode,
          logo_url: logoUrl,
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
      console.error(error);
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

      let user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (user) {
        return res.status(200).json(user);
      } else {
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

  var getUsersByGroupId = async function (req, res, next) {
    try {
      const { group_id } = req.params;

      if (isNaN(group_id)) {
        res.status(400);
        throw new Error("group id must be an integer");
      }

      const users = await User.findAll({
        where: {
          group_id: group_id,
        },
        attributes: {
          exclude: [
            "password",
            "created_at",
            "updated_at",
            "group_id",
            "language_id",
          ],
        },
      });

      if (!users) {
        res.status(404);
        throw new Error(`no users were found with group id ${group_id}`);
      }
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };

  var deleteUserById = async function (req, res, next) {
    try {
      let deleteUser = await User.destroy({
        where: {
          id: req.params["id"],
        },
      });

      if (deleteUser === 0) {
        throw new Error("no user found with the given id");
      }

      return res.status(200).json();
    } catch (error) {
      next(error);
    }
  };

  var updateUserById = async function (req, res, next) {
    try {
      let currentUser = await User.findOne({
        where: {
          id: req.params["id"],
        },
        // Cannot exlude password, created_at, updated_at because of "SequelizeValidationError: notNull Violation: password field is required" comming from "/server/models/user.js"
        // attributes: { exclude: ["password", "created_at", "updated_at"] },
      });

      if (!currentUser) {
        res.status(400);
        throw new Error("user with given id was not found");
      }

      if (req.body?.email) {
        const { group_id, email } = req.body;
        const existingUser = await User.findOne({ where: { group_id, email } });
        if (existingUser) {
          return res
            .status(400)
            .json({ error: "Email already exists within the group" });
        }
      }

      Object.keys(req.body).forEach((key) => {
        currentUser[key] = req.body[key] ? req.body[key] : currentUser[key];
      });

      await currentUser.validate();
      await currentUser.save();

      return res.status(200).json(currentUser);
    } catch (error) {
      next(error);
    }
  };

  var addUser = async function (req, res, next) {
    try {
      const { first_name, last_name, email, role_id, group_id } = req.body;

      // Check if email is unique within the group, so email can appear once per group but can appear across multiple groups
      const existingUser = await User.findOne({ where: { email, group_id } });
      if (existingUser) {
        // TODO: Give client feedback that email already exists within the group

        return res
          .status(400)
          .json({ error: "Email already exists within the group" });
      }

      const randomPassword = crypto
        .randomBytes(12)
        .toString("base64")
        .slice(0, 12);

      // TODO: Send email to new user with password

      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      const newUser = {
        first_name,
        last_name,
        email,
        password: hashedPassword,
        role_id,
        language_id: 1,
        group_id,
      };

      await User.build(newUser).validate();
      const result = await User.create(newUser);

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  return {
    registerUser,
    logInUser,
    getUserByUserId,
    updateUserById,
    getUsersByGroupId,
    deleteUserById,
    updateUserById,
    addUser,
    fetchUser,
  };
};

module.exports = UserController();
