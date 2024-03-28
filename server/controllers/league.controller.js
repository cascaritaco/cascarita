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

  var isNameUniqueWithinGroup = async function (groupId, leagueName) {
    let leagueFound = await League.findOne({
      where: {
        group_id: groupId,
        name: leagueName,
      },
    });

    if (leagueFound) {
      throw { field: "name", message: "name is not unique" };
    }
  };

  var createLeague = async function (req, res) {
    const newLeague = {
      group_id: req.body.group_id,
      name: req.body.name,
      description: req.body.description,
    };

    try {
      await isNameUniqueWithinGroup(newLeague.group_id, newLeague.name);

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

      return res.status(400).json({ error });
    }
  };

  var updateLeague = async function (req, res) {
    try {
      let currentLeague = await League.findOne({
        where: {
          id: req.body.id,
        },
      });

      if (!currentLeague) {
        return res.status(500).json({ error: "No League Found" });
      }

      currentLeague.group_id = req.body.group_id || currentLeague.group_id;
      currentLeague.name = req.body.name || currentLeague.name;
      currentLeague.description =
        req.body.description || currentLeague.description;

      await currentLeague.save();

      return res.status(200).json({ success: true, data: currentLeague });
    } catch (error) {
      return res.status(500).json({ error: "Failed to update League" });
    }
  };

  var deleteLeague = async function (req, res) {
    try {
      let deletedLeague = await League.destroy({
        where: {
          id: req.body.id,
        },
      });

      if (deletedLeague === 0) {
        return res
          .status(404)
          .json({ error: "No league found with the given ID" });
      }
      return res.status(200).json();
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete league" });
    }
  };

  return {
    getLeagueByGroupId,
    createLeague,
    updateLeague,
    deleteLeague,
  };
};

module.exports = LeagueController();
