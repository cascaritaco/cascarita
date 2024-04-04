"use strict";

const { Op, Sequelize } = require("sequelize");
const { Group, Season } = require("../models");
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
   * If no results are found, an empty array is returned. Accepted query
   * parameters are:
   *    - `name`: the name (or parts of a name) of a season.
   *    - `group`: the id or name of a group.
   *    - `is_active`: if a season is active.
   * Query parameters may be in any order. Unknown parameters are ignored.
   *
   * @param {Request} req The Express request object. An optional query string
   * is accepted to narrow search results.
   * @param {Response} res The Express response object.
   * @param {NextFunction} next The Express next function to call.
   *
   * @returns {Promise<any>} A promise that resolves to a list of seasons.
   */
  async getAllSeasons(req, res, next) {
    try {
      const { query } = req;
      const whereClause = {};

      if (query.name) {
        whereClause["$Season.name$"] = {
          [Op.substring]: query.name.toLowerCase().trim(),
        };
      }
      if (query.group) {
        const group = parseInt(query.group, 10);
        if (isNaN(group)) {
          whereClause["$Group.name$"] = {
            [Op.substring]: query.group.toLowerCase().trim(),
          };
        } else {
          whereClause["$Group.id$"] = group;
        }
      }
      if (query.is_active) {
        whereClause["is_active"] = query.is_active.toLowerCase() === "true";
      }

      const seasons = await Season.findAll({
        where: whereClause,
        include: Group,
      });
      return res.json(seasons);
    } catch (error) {
      next(error);
    }
  },
  /**
   * Retrieves a season by its `id`.
   *
   * The `id` must be an integer, otherwise will respond with a status code of
   * 400. Reponds with a status code of 404 if no season is found with `id`.
   *
   * @param {Request} req The Express request object. Expects `id` to be in the
   * request parameters.
   * @param {Response} res The Express response object.
   * @param {NextFunction} next The Express next function to call.
   *
   * @returns {Promise<any>} A promise that resolves to a single season with a
   * status code of 200.
   */
  async getSeason(req, res, next) {
    try {
      const { id } = req.params;
      if (isNaN(id)) {
        res.status(400);
        throw new Error("season id must be an integer");
      }

      const season = await Season.findByPk(id, {
        include: Group,
      });
      if (!season) {
        res.status(404);
        throw new Error(`no season found with id '${id}'`);
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

      if (req.body.group_id) {
        res.status(400);
        throw new Error("cannot update the 'group_id' field");
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
