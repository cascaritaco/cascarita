"use strict";

require("dotenv").config();

const Form = require("./../mongoModel/form");

const SeasonController = {
  async createForm(req, res, next) {
    console.log(req.body);

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

      const form = new Form({
        group_id: req.params.id,
        form_data: responseBody,
        form_blueprint: req.body,
      });

      const result = await form.save();
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = SeasonController;
