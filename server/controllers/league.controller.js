"use strict";

const { League } = require("../models");

const LeagueController = function () {
  var getLeagueByGroupId = async function (req, res, next) {
    const groupId = req.params.id;

    try {
      const result = await League.findAll({
        where: {
          group_id: groupId,
        },
      });

      if (Object.keys(result).length === 0) {
        throw new Error("Group with given ID has no leagues or not found");
      }

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  var isNameUniqueWithinGroup = async function (groupId, leagueName) {
    let leagueFound = await League.findOne({
      where: {
        group_id: groupId,
        name: leagueName,
      },
    });

    return leagueFound == null;
  };

  var createLeague = async function (req, res, next) {
    const { group_id, name, description } = req.body;
    const newLeague = { group_id, name, description };

    try {
      const leagueFound = await isNameUniqueWithinGroup(
        newLeague.group_id,
        newLeague.name,
      );

      if (!leagueFound) {
        res.status(400);
        throw new Error("Name is not unique");
      }

      await League.build(newLeague).validate();
      const result = await League.create(newLeague);

      return res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  var updateLeague = async function (req, res, next) {
    try {
      let currentLeague = await League.findOne({
        where: {
          id: req.params["id"],
        },
      });

      if (!currentLeague) {
        res.status(400);
        throw new Error("League with given ID was not found");
      }

      Object.keys(req.body).forEach((key) => {
        if (key !== "group_id") {
          currentLeague[key] = req.body[key] ? req.body[key] : currentLeague[key];
        }
      });

      const leagueFound = await isNameUniqueWithinGroup(
        currentLeague.group_id,
        currentLeague.name,
      );

      if (!leagueFound) {
        throw new Error("Name is not unique");
      }

      await currentLeague.validate();
      await currentLeague.save();

      return res.status(200).json({ success: true, data: currentLeague });
    } catch (error) {
      next(error);
    }
  };

  var deleteLeague = async function (req, res, next) {
    try {
      let deletedLeague = await League.destroy({
        where: {
          id: req.params["id"],
        },
      });

      if (deletedLeague === 0) {
        throw new Error("No league found with the given ID");
      }

      return res
        .status(204)
        .json({ success: true, message: "Delete league successfully" });
    } catch (error) {
      next(error);
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
