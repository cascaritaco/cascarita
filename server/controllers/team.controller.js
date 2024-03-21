"use strict";
const { Team } = require("./../models");

const TeamController = function () {
  var createTeam = async function (req, res) {
    const newTeam = {
      group_id: req.body.group_id,
      name: req.body.name,
      team_logo: req.body.team_logo,
    };

    try {
      await Team.build(newTeam).validate();
      const result = await Team.create(newTeam);

      return res.status(201).json({
        success: true,
        data: data,
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
    createTeam,
  };
};

module.exports = TeamController();
