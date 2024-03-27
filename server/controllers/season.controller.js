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
   * Retrieves all the seasons in the database. Results be filtered using query
   * string parameters.
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
      const query = filterNullEntries(req.query)
      // TODO: Validate the query. All values are strings but some should be
      //       numbers, booleans, etc.
      const seasons = await Season.findAll({
        where: query !== undefined ? query : {},
      });
      res.json(seasons);
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
   * @returns {Promise<any>} A promise that resolves with a single season. If a
   * malformed `id` is provided, a status code of 400 will be returned with an
   * error message.
   */
  async getSeason(req, res, next) {
    try {
      const id = req.params.id;
      if (id === undefined) {
        throw new Error("expected season id in request parameters.");
      }
      const season = await Season.findByPk(id);
      if (season === null) {
        res.status(400);
        throw new Error(`no such season with id ${id}.`);
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
   * season. If the season is successfully created, a success message with a
   * status code of 201 is sent in the response body. If the request body is
   * missing or malformed, a 400 status code is sent in the response body.
   * If an error occurs during the creation process, an error message with a
   * status code of 500 will be returned.
   */
  async createSeason(req, res, next) {
    try {
      const requestBody = {
        name: req.body.name,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        is_active: req.body.is_active,
        group_id: req.body.group_id,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at,
      };
      // TODO: Validate the request body
      const season = await Season.create(requestBody);
      res.status(201).json(season);
    } catch (error) {
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
   * @returns {Promise<any>} An empty promise. If the season is successfully
   * updated, the updated season object is sent in the response with a 200
   * status code. If the request body is missing or malformed, or if the season
   * ID is missing or invalid, an error message with a 400 status code is sent
   * in the response body.
   */
  async updateSeason(req, res, next) {
    const { id } = req.params;
    const updatedSeasonData = req.body;
    try {
      if (id === undefined) {
        res.status(400)
        throw new Error(`expected id path parameter.`)
      }
      // TODO: Validate the request body
      const updatedSeason = { id: Number(id), ...updatedSeasonData };
      return res.status(200).json(updatedSeason);
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
   * deleted, a 204 status code is sent in the response body. If the season ID
   * is missing or malformed, an error message with a 400 status code is sent
   * in the response body. Nothing happens when attempting to delete a season
   * that does not exist.
   */
  async deleteSeason(req, res, next) {
    const { id } = req.params;
    try {
      if (id === undefined) {
        res.status(400)
        throw new Error(`expected id path parameter.`)
      }
      Season.destroy({
        where: {
          id: id,
        }
      });
      res.status(204).json()
    } catch (error) {
      next(error);
    }
  },
};

function filterNullEntries(oldObject) {
  const newObject = {};
  for (const key in oldObject) {
    if (oldObject[key] !== null) {
      newObject[key] = oldObject[key];
    }
  }
  return newObject;
}


module.exports = SeasonController;
