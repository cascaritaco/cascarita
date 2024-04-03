"use strict";

const { Season } = require("../models");
const { NextFunction } = require("express");

/**
 * Controller for managing seasons, providing endpoints for CRUD operations.
 * Handles requests related to seasons, including creation, retrieval,
 * updating, and deletion.
 * This controller interacts with the `Season` model to perform database
 * operations.
 */
const SeasonController = {
  /**
   * Retrieves all the seasons in the database. Results may be filtered using
   * query string parameters.
   *
   * @param {Request} req The Express request object. An optional query string
   * is accepted to narrow search results.
   * @param {Response} res The Express response object.
   * @param {NextFunction} next The Express next function to call.
   *
   * @returns {Promise<any>} A promise that resolves to a list of seasons. If
   * no results are found, an empty array is returned. Unknown query parameters
   * are ignored.
   */
  async getAllSeasons(req, res, next) {
    try {
      const { query } = req;
      const whereClause = {};

      for (const key in query) {
        if (Season.rawAttributes[key]) {
          const dataType = Season.rawAttributes[key].type.constructor.key;
          let parsedValue = query[key];

          if (dataType === "INTEGER" || dataType === "BIGINT") {
            parsedValue = parseInt(parsedValue, 10);
          } else if (
            dataType === "FLOAT" ||
            dataType === "DOUBLE" ||
            dataType === "REAL"
          ) {
            parsedValue = parseFloat(parsedValue);
          } else if (dataType === "BOOLEAN") {
            parsedValue = parsedValue.toLowerCase() === "true";
          }

          whereClause[key] = parsedValue;
        }
      }

      const seasons = await Season.findAll({ where: whereClause });
      return res.json(seasons);
    } catch (error) {
      next(error);
    }
  },
  /**
   * Retrieves a season by its `id`.
   *
   * @param {Request} req The Express request object. Expects `id` to be in the
   * request parameters.
   * @param {Response} res The Express response object.
   * @param {NextFunction} next The Express next function to call.
   *
   * @returns {Promise<any>} A promise that resolves to a single season. If a
   * malformed `id` is provided, a status code of 400 will be returned with an
   * error message. Returns an error and a status code of 404 if no season
   * exists with the `id` specified.
   */
  async getSeason(req, res, next) {
    try {
      const { id } = req.params;
      if (!id || isNaN(id)) {
        res.status(400);
        throw new Error("expected season id in request parameters");
      }
      const season = await Season.findByPk(id);
      if (!season) {
        res.status(404);
        throw new Error(`no such season with id ${id}`);
      }
      res.json(season);
    } catch (error) {
      next(error);
    }
  },
  /**
   * Creates a new season.
   *
   * @param {Request} req The Express request object. Expects the `Season`
   * object to be provided in the request body.
   * @param {Response} res The Express response object.
   * @param {NextFunction} next The Express next function to
   * call.
   *
   * @returns {Promise<any>} A promise that resolves to the newly created
   * season. If the season is successfully created, a status code of 201 is
   * sent. If the request body is missing or malformed, an error message with
   * a 400 status code is sent in the response body.
   */
  async createSeason(req, res, next) {
    try {
      const requestBody = {
        name: req.body.name,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        is_active: req.body.is_active,
        group_id: req.body.group_id,
      };
      const season = await Season.create(requestBody);
      res.status(201).json(season);
    } catch (error) {
      res.status(400);
      next(error);
    }
  },
  /**
   * Updates an existing season.
   *
   * @param {Request} req The Express request object. Expects the updated
   * `Season` object to be provided in the request body, containing the
   * updated information for the season. Additionally, the `id` of the season
   * to be updated should be included in the request parameters.
   * @param {Response} res The Express response object.
   * @param {NextFunction} next The Express next function to
   * call.
   *
   * @returns {Promise<any>} An promise that resolves to the updated season.
   * If the request body is missing or malformed, or if the season `id` is
   * missing or invalid, an error message with a 400 status code is sent
   * in the response body.
   */
  async updateSeason(req, res, next) {
    const { id } = req.params;
    try {
      if (!id || isNaN(id)) {
        res.status(400);
        throw new Error("expected season id in request parameters");
      }
      const season = await Season.findByPk(id);
      if (!season) {
        res.status(404);
        throw new Error(`no such season with id ${id}`);
      }

      const updatedSeasonData = await season.update(req.body);
      return res.json(updatedSeasonData);
    } catch (error) {
      next(error);
    }
  },
  /**
   * Deletes a season by its `id`.
   *
   * @param {Request} req The Express request object. Expects the `id` of the
   * season to be deleted to be included in the request parameters.
   * @param {Response} res The Express response object.
   * @param {NextFunction} next The Express next function to
   * call.
   *
   * @returns {Promise<any>} An empty promise. If the season is successfully
   * deleted, a 204 status code is sent in the response body. Responds with a
   * 404 if no season exists with the `id` sent.
   */
  async deleteSeason(req, res, next) {
    const { id } = req.params;
    try {
      let season = await Season.findByPk(id);
      if (season === null) {
        res.status(404);
        throw new Error(`no season found for it ${id}`);
      }
      await season.destroy();
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
};

module.exports = SeasonController;
