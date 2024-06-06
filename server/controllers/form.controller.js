"use strict";

require("dotenv").config();

const RawResponse = require("./../mongoModel/raw_response");
const ResponseId = require("./../mongoModel/response_id");
const FormMongo = require("./../mongoModel/form");
const { Form } = require("../models");

const FormController = {
  async getResponses(req, res, next) {
    try {
      const response = await fetch(
        `https://api.typeform.com/forms/${req.params.form_id}/responses`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.TYPEFORM_API_TOKEN}`,
            "Content-Type": "application/json",
          },
        },
      );

      const responseBody = await response.json();

      const rawResponse = new RawResponse({
        raw_response_data: responseBody,
      });

      const result = await rawResponse.save();

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },
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

module.exports = FormController;
