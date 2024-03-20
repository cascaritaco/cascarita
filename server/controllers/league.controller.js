"use strict";
const { League } = require("../models");

const LeagueController = function () {
  var getLeagueByGroupId = async function (req, res) {
    const groupId = req.body.group_id;

    try {
      const result = await League.findAll({
        where: {
          group_id: groupId,
        },
      });

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch leagues" });
    }
  };

  var createLeague = async function (req, res) {
    const newLeague = {
      group_id: req.body.group_id,
      name: req.body.name,
      description: req.body.description,
    };

    try {
      await League.build(newLeague).validate();
      const result = await League.create(newLeague);

      return res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      const validationErrors = error.errors?.map((err) => ({
        field: err.path,
        message: err.message,
      }));

      return res
        .status(400)
        .json({ error: "Validation error", details: validationErrors });
    }
  };

  return {
    getLeagueByGroupId,
    createLeague,
  };
};

module.exports = LeagueController();
