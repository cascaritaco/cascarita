"use strict";

const { User, AuthCode } = require("../models");
const passport = require("passport");
const GroupController = require("./group.controller");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

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

  var generateOTP = function () {
    const length = 6;
    const otp = crypto.randomInt(
      Math.pow(10, length - 1),
      Math.pow(10, length),
    );
    return otp.toString();
  };

  async function hashOtp(otp) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedOtp = await bcrypt.hash(otp, salt);
    return hashedOtp;
  }

  async function compareOtp(otp, hashedOtp) {
    return await bcrypt.compare(otp, hashedOtp);
  }

  async function isEmailRegistered(recipientEmail) {
    const user = await User.findAll({
      limit: 1,
      where: {
        email: recipientEmail,
      },
    });

    if (!user[0]) {
      throw new Error(`no user was found with email ${recipientEmail}`);
    }

    return user[0];
  }

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

  var sendEmail = async function (recipientEmail, subject, emailContent) {
    const brevoAPIKey = process.env.BREVO_API_KEY;
    const url = "https://api.brevo.com/v3/smtp/email";

    const senderEmail = "jgomez.cascarita@gmail.com"; // (i.e. no-reply-cascarita@gmail.com) once
    const senderName = "Cascarita";
    const type = "classic";

    const body = JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: recipientEmail }],
      type: type,
      subject,
      htmlContent: emailContent,
    });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": brevoAPIKey,
      },
      body,
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(
        `failed to send email: ${responseData.message}, ${responseData.code}`,
      );
    }
  };

  var sendOtpEmail = async function (req, res, next) {
    try {
      const recipientEmail = req.body.email;

      const user = await isEmailRegistered(recipientEmail);

      const authCode = generateOTP();
      const subject = "Cascarita - Reset Your Password";
      const emailContent = `
          <html>
            <body>
              <p>Hello,</p>
              <p>Use this code to reset your password:</p>
              <h1><strong>${authCode}</strong></h1>
              <p>Thank you!</p>
            </body>
          </html>`;

      await sendEmail(recipientEmail, subject, emailContent);

      const newAuthCode = {
        user_id: user.id,
        email: recipientEmail,
        code: await hashOtp(authCode),
        attempts: 0,
        start_date: new Date(),
        expiration_date: new Date(new Date().getTime() + 15 * 60000),
      };

      await AuthCode.build(newAuthCode).validate();
      await AuthCode.create(newAuthCode);

      return res.status(200).json({ response: "email sent successfully" });
    } catch (error) {
      console.error("failed to send otp email:", error);
      next(error);
    }
  };

  var sendFormLinkEmail = async function (req, res, next) {
    try {
      const recipientEmail = req.body.email;
      const formLink = req.body.formLink;

      await isEmailRegistered(recipientEmail);

      const subject = "Cascarita - Please fill out this form";
      const emailContent = `
        <html>
          <body>
            <p>Hello,</p>
            <p>Please fill out the following form:</p>
            <a href="${formLink}">Fill out the form</a>
            <p>Thank you!</p>
          </body>
        </html>`;

      await sendEmail(recipientEmail, subject, emailContent);

      return res.status(200).json({ response: "email sent successfully" });
    } catch (error) {
      console.error("failed to send email:", error);
      next(error);
    }
  };

  var verifyOTP = async function (req, res, next) {
    try {
      const MAX_OPT_ATTEMPTS = 5;
      const otp = req.body.otp;

      const response = await AuthCode.findAll({
        limit: 1,
        where: {
          email: req.body.email,
        },
        order: [["start_date", "DESC"]],
      });

      const userOtp = response[0];

      if (!userOtp) {
        res.status(404);
        throw new Error(`no entry was found with email: ${req.body.email}`);
      }

      if (userOtp.attempts >= MAX_OPT_ATTEMPTS) {
        res.status(401);
        throw new Error("reached max number of attempts. generate a new code");
      }

      if (userOtp.expiration_date < new Date()) {
        res.status(401);
        throw new Error("auth code has expired. generate a new code");
      }

      const result = await compareOtp(otp, userOtp.code);

      if (!result) {
        userOtp.attempts = userOtp.attempts + 1;

        await userOtp.validate();
        await userOtp.save();

        res.status(401);
        throw new Error("incorrect auth code");
      }

      await AuthCode.destroy({
        where: {
          email: req.body.email,
        },
      });

      return res.status(200).json({ result: result });
    } catch (error) {
      console.error("failed to verify otp:", error);
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
        attributes: { exclude: ["password", "created_at", "updated_at", "group_id", "language_id"] },
      });

      if (!users) {
        res.status(404);
        throw new Error(`no users were found with group id ${group_id}`);
      }
      return res.status(200).json(users);
    } catch (error) {
      next(error)
    }
  };

  var deleteUserById = async function (req, res, next) {
    try {
      let deleteUser = await User.destroy({
        where: {
          id: req.params["id"],
        }
      })

      if (deleteUser === 0) {
        throw new Error("no user found with the given id");
      }

      return res.status(200).json();
    } catch (error) {
      next(error)
    }
  }

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

      Object.keys(req.body).forEach((key) => {
        currentUser[key] = req.body[key] ? req.body[key] : currentUser[key];
      });

      await currentUser.validate();
      await currentUser.save();

      return res.status(200).json(currentUser);
    } catch (error) {
      next(error);
    }
  }

  var addUser = async function (req, res, next) {

    //TODO: Need to generate random password and email to user
    //TODO: Need to validate email is unique within group

    try {
      const newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: "123",
        role_id: req.body.role_id,
        language_id: 1,
        group_id: req.body.group_id,
      };

      await User.build(newUser).validate();
      const result = await User.create(newUser);

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  return {
    registerUser,
    logInUser,
    getUserByUserId,
    updateUserById,
    sendOtpEmail,
    sendFormLinkEmail,
    verifyOTP,
    getUsersByGroupId,
    deleteUserById,
    updateUserById,
    addUser,
  };
};

module.exports = UserController();
