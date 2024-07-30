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
      }).select(
        "form_data.id form_data.title form_data._links.display created_by updated_by createdAt updatedAt",
      );

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

  async emailForm(req, res, next) {
    try {
      const apiKey = process.env.BREVO_API_KEY;
      const url = "https://api.brevo.com/v3/smtp/email";

      const typeformLink = req.body.formLink;
      const recipientEmail = req.body.email;

      const senderEmail = "abanuelos.cascarita@gmail.com";
      const senderName = "Cascarita";
      const subject = "Cascarita - Please fill out this form";
      const type = "classic";

      const emailContent = `
        <html>
          <body>
            <p>Hello,</p>
            <p>Please fill out the following form:</p>
            <a href="${typeformLink}">Fill out the form</a>
            <p>Thank you!</p>
          </body>
        </html>
      `;

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
      return res.status(200).json({ data: responseData });
    } catch (error) {
      console.error("Failed to send email:", error);
      next(error);
    }
  },
  /**
   * Updates the Form with an id of `form_id`. Attempting to update a Form that
   * does not exist will send a 404 error to the `res` response.
   * @param {import("express").Request} req The request object.
   * @param {import("express").Response} res The response of the request.
   * @param {import("express").NextFunction} next The next function to call.
   */
  async update(req, res, next) {
    // 1. Fetch the corresponding Form from persistent memory.
    // 2. If the form has responses, the form cannot be updated.
    // 3. Update the Forms SQL table and MongoDB collection.
    // 4. Send the updated Form object back to the response.
    // 5. Gracefully handle any errors.
  },
  /**
   * Deletes the Form with an id of `form_id`. Attempting to delete a Form that
   * does not exist will have no effect.
   * @param {import("express").Request} req The request object.
   * @param {import("express").Response} res The response of the request.
   * @param {import("express").NextFunction} next The next function to call.
   */
  async delete(req, res, next) {
    // 1. Fetch the corresponding Form from persistent memory.
    // 2. Delete all responses from the Form.
    // 3. Delete the Form from the SQL table and MongoDB collection.
    // 4. Gracefully handle any errors.
  }
};

module.exports = FormController;
