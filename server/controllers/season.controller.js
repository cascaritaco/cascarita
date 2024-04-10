"use strict";

const { Op } = require("sequelize");
const { League, Season } = require("../models");

const SeasonController = {
  async getAllSeasons(req, res, next) {
    try {
      const { query } = req;
      const whereClause = {};

      if (query.name) {
        whereClause["$Season.name$"] = {
          [Op.substring]: query.name.toLowerCase().trim(),
        };
      }
      if (query.league) {
        const league = parseInt(query.league, 10);
        if (isNaN(league)) {
          whereClause["$League.name$"] = {
            [Op.substring]: query.league.toLowerCase().trim(),
          };
        } else {
          whereClause["$League.id$"] = league;
        }
      }
      if (query.is_active) {
        whereClause["is_active"] = query.is_active.toLowerCase() === "true";
      }

      const seasons = await Season.findAll({
        where: whereClause,
        include: League,
      });
      return res.json(seasons);
    } catch (error) {
      next(error);
    }
  },
  async getSeason(req, res, next) {
    try {
      const { id } = req.params;
      if (isNaN(id)) {
        res.status(400);
        throw new Error("season id must be an integer");
      }

      const season = await Season.findByPk(id, {
        include: League,
      });
      if (!season) {
        res.status(404);
        throw new Error(`no such season with id ${id}`);
      }

      res.json(season);
    } catch (error) {
      next(error);
    }
  },
  async createSeason(req, res, next) {
    try {
      const { name, league_id } = req.body;
      const isUnique = await isNameUniqueWithinLeague(name, league_id);
      if (!isUnique) {
        res.status(400);
        throw new Error("name is not unique")
      }

      const season = await Season.create(req.body);
      res.status(201).json(season);
    } catch (error) {
      res.status(400);
      next(error);
    }
  },
  async updateSeason(req, res, next) {
    const { id } = req.params;
    try {
      if (isNaN(id)) {
        res.status(400);
        throw new Error("expected id to be a number");
      }

      const season = await Season.findByPk(id);
      if (!season) {
        res.status(404);
        throw new Error(`no such season with id ${id}`);
      }

      const { name, league_id } = req.body;
      if (league_id) {
        res.status(400);
        throw new Error("cannot update the 'league_id' field");
      }
      const isUnique = await isNameUniqueWithinLeague(name, season.league_id);
      if (!isUnique) {
        res.status(400);
        throw new Error("name is not unique")
      }

      const updatedSeasonData = await season.update(req.body);
      return res.json(updatedSeasonData);
    } catch (error) {
      next(error);
    }
  },
  async deleteSeason(req, res, next) {
    const { id } = req.params;
    try {
      let season = await Season.findByPk(id);
      if (season === null) {
        res.status(404);
        throw new Error(`no such season with id ${id}`);
      }

      await season.destroy();
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
};

async function isNameUniqueWithinLeague(name, leagueId) {
  const league = await Season.findOne({
    where: {
      league_id: leagueId,
      name: name,
    },
  });

  return league === null
}

module.exports = SeasonController;
