"use strict";

require("dotenv").config();

// const { Form } = require("../models");

const SeasonController = {
  async createForm(req, res, next) {
    try {
      const response = await fetch("https://api.typeform.com/forms", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.TYPEFORM_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });

      const responseBody = await response.json();

      return res.json(responseBody);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = SeasonController;
