"use strict";

require("dotenv").config();

const FormMongo = require("./../mongoModel/form");
const { Form } = require("../models");

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

      const form = new FormMongo({
        group_id: req.params.id,
        form_data: responseBody,
        form_blueprint: req.body,
      });

      const result = await form.save();

      const newForm = {
        group_id: req.params.id,
        document_id: result.id,
      };

      await Form.build(newForm).validate();
      const sqlResult = await Form.create(newForm);

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = SeasonController;
