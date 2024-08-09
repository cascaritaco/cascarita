"use strict";

require("dotenv").config();

const Response = require("./../mongoModels/response");
const FormMongo = require("./../mongoModels/form");
const { Form, User } = require("../models");

const FormController = {
  async getAllForms(req, res, next) {
    try {
      const mongoForms = await FormMongo.find({
        group_id: { $in: req.params.id },
      }).select("form_data.title created_by updated_by createdAt updatedAt");

      return res.status(201).json(mongoForms);
    } catch (error) {
      next(error);
    }
  },
  async createResponse(req, res, next) {
    try {
      const insertedResponse = new Response({
        form_id: req.body.form_id,
        response: {
          answers: req.body.data,
        },
      });

      await insertedResponse.save();

      return res.status(201).json(insertedResponse);
    } catch (error) {
      next(error);
    }
  },
  async getResponsesByFormId(req, res, next) {
    try {
      const responses = await Response.find({
        form_id: req.params.form_id,
      });

      return res.status(201).json(responses);
    } catch (error) {
      next(error);
    }
  },
  async createForm(req, res, next) {
    try {
      const form_data = { title: req.body.title, fields: req.body.fields };

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
        form_data: form_data,
        form_blueprint: req.body,
      });

      const result = await form.save();

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

  async getFormByDocumentId(req, res, next) {
    try {
      const results = await FormMongo.findById(req.params.document_id);

      return res.status(201).json(results);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = FormController;
