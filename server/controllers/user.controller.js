"use strict";

const { User, AuthCode } = require("../models");
const passport = require("passport");
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

  var generateOTP = async function () {
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

  var sendEmail = async function (req, res, next) {
    try {
      const apiKey = process.env.BREVO_API_KEY;
      const url = "https://api.brevo.com/v3/smtp/email";

      const emailType = req.body.emailType;
      const typeformLink = req.body.formLink || "";
      const recipientEmail = req.body.email;

      const senderEmail = "jgomez.cascarita@gmail.com"; //Ask Armando if we could use a fake email instead of ours (i.e. no-reply-cascarita@gmail.com)
      const senderName = "Cascarita";
      const type = "classic";

      const authCode =
        emailType === "passwordCode" ? await generateOTP() : null;

      const emailTypes = {
        passwordCode: {
          subject: "Cascarita - Reset Your Password",
          type: "classic",
          emailContent: `
        <html>
          <body>
            <p>Hello,</p>
            <p>Use this code to reset your password:</p>
            <h1><strong>${authCode}</strong></h1>
            <p>Thank you!</p>
          </body>
        </html>`,
        },
        formLink: {
          subject: "Cascarita - Please fill out this form",
          emailContent: `
        <html>
          <body>
            <p>Hello,</p>
            <p>Please fill out the following form:</p>
            <a href="${typeformLink}">Fill out the form</a>
            <p>Thank you!</p>
          </body>
        </html>`,
        },
      };

      const { subject, emailContent } = emailTypes[emailType] || {};

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
          "api-key": apiKey,
        },
        body,
      });

      const responseData = await response.json();

      const newAuthCode = {
        email: req.body.email,
        code: await hashOtp(authCode),
        attempts: 0,
        start_date: new Date(),
        expiration_date: new Date(new Date().getTime() + 15 * 60000),
      };

      await AuthCode.build(newAuthCode).validate();
      await AuthCode.create(newAuthCode);

      return res.status(200).json({ data: responseData });
    } catch (error) {
      console.error("failed to send email:", error);
      next(error);
    }
  };

  var verifyOTP = async function (req, res, next) {
    try {
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

  return {
    registerUser,
    logInUser,
    getUserByUserId,
    updateUser,
    sendEmail,
    verifyOTP,
  };
};

module.exports = UserController();
