"use strict";
const { Group } = require("../models");

const GroupController = function () {
  var createGroup = async function (req, res) {
    const newGroup = {
      name: req.body.name,
    };

    try {
      await Group.build(newGroup).validate();
      const result = await Group.create(newGroup);

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
    createGroup,
  };
};

module.exports = GroupController();
