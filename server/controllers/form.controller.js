"use strict";

require("dotenv").config();

const jsonParser = require("../utilityFunctions/responseParser");

const RawResponse = require("./../mongoModels/raw_response");
const ResponseId = require("./../mongoModels/response_id");
const Response = require("./../mongoModels/response");
const FormMongo = require("./../mongoModels/form");
const { Form, User } = require("../models");

const FormController = {
  async getAllForms(req, res, next) {
    try {
      const groupId = req.params.id;

      const sqlForms = await Form.findAll({
        where: {
          group_id: groupId,
        },
        attributes: ["document_id"],
      });

      const documentIds = sqlForms.map((form) => form.document_id);

      const mongoForms = await FormMongo.find({
        _id: { $in: documentIds },
      }).select(
        "form_data.id form_data.title form_data._links.display created_by updated_by createdAt updatedAt",
      );

      return res.status(201).json(mongoForms);
    } catch (error) {
      next(error);
    }
  },
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
      const user = await User.findByPk(req.params.user_id, {
        attributes: { exclude: ["password"] },
      });
      if (!user) {
        res.status(404);
        throw new Error(`no user was found with id ${req.params.user_id}`);
      }

      const createdBy = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      };

      const form = new FormMongo({
        group_id: req.params.group_id,
        created_by: createdBy,
        updated_by: null,
        form_data: responseBody,
        form_blueprint: req.body,
      });

      const result = await form.save();

      console.log("Testing the group-id thingy", req.params.group_id);

      const newForm = {
        group_id: req.params.group_id,
        created_by: req.params.user_id,
        updated_by: null,
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
