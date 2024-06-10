"use strict";

require("dotenv").config();

const jsonParser = require("../utilityFunctions/responseParser");

const RawResponse = require("./../mongoModels/raw_response");
const ResponseId = require("./../mongoModels/response_id");
const Response = require("./../mongoModels/response");
const FormMongo = require("./../mongoModels/form");
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

      if (!response.ok) {
        throw new Error(
          "typeform api call failed with status code of: " + response.status,
        );
      }

      const responseBody = await response.json();

      const rawResponse = new RawResponse({
        form_id: req.params.form_id,
        raw_response_data: responseBody,
      });

      const results = await RawResponse.find({
        form_id: req.params.form_id,
      });

      if (results.length === 0) {
        await rawResponse.save();
      } else {
        await rawResponse.updateOne(
          { _id: results._id },
          { $set: { raw_response_data: responseBody } },
        );
      }

      const responseIdEntries = await ResponseId.findOne({
        form_id: req.params.form_id,
      });

      const uniqueResponseIds =
        jsonParser.loadMapWithDocument(responseIdEntries);

      const jsonResponseBody = JSON.stringify(responseBody);

      const parsedResponse = jsonParser.parseResponseJSON(
        jsonResponseBody,
        uniqueResponseIds,
        req.params.form_id,
      );

      const sortedResponses = new Response({
        form_id: req.params.form_id,
        response: parsedResponse,
      });

      const responsesToInsert = sortedResponses.response.map((res) => ({
        form_id: req.params.form_id,
        response: res,
      }));

      await Response.insertMany(responsesToInsert);

      const individualResponses = await Response.find({
        form_id: req.params.form_id,
      });

      return res.status(201).json(individualResponses);
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

      if (!response.ok) {
        throw new Error(
          "typeform api call failed with status code of: " + response.status,
        );
      }

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
      await Form.create(newForm);

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = FormController;
