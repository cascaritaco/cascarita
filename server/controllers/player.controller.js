"use strict";
const validator = require("validator");
const { Player } = require("../models");

const PlayerController = function () {
  var createPlayer = async function (req, res) {
    const newPlayer = {
      group_id: req.body.group_id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      profile_picture: req.body.profile_picture,
      date_of_birth: req.body.date_of_birth,
      phone_number: req.body.phone_number,
    };

    if (!validator.isMobilePhone(newPlayer.phone_number, "any")) {
      const validationErrors = [
        {
          field: "phone_number",
          message: "Invalid phone number",
        },
      ];
      return res
        .status(400)
        .json({ error: "Validation error", details: validationErrors });
    }

    try {
      await Player.build(newPlayer).validate();
      const result = await Player.create(newPlayer);

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
  return {
    createPlayer,
  };
};

module.exports = PlayerController();
