"use strict";

require("dotenv").config();

const Form = require("./../mongoModel/form");
const Movie = require("./../mongoModel/movie");

const SeasonController = {
  async createForm(req, res, next) {
    //console.log(req.body);

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
      console.log("here in the create form constroller funciton");
      next(error);
    }
  },

  async getMovie(req, res, next) {
    try {
      const movie = await Movie.findById(req.body.id);

      return res.status(201).json(movie);
    } catch (error) {
      next(error);
    }
  },
  async createMovie(req, res, next) {
    try {
      const movie = new Movie({
        name: req.body.name,
        release_year: req.body.release_year,
      });

      await movie.save();

      return res.status(201).json(movie._id);
    } catch (error) {
      console.log("here in the create movie constroller funciton");
      next(error);
    }
  },
};

module.exports = SeasonController;
