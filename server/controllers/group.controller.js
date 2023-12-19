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
      return res.status(400).json({ error: error.message });
    }
  };

  var _checkUniqueGroupName = async function (inputGroupName) {
    const existingGroupName = await Group.findOne({
      where: { name: inputGroupName },
    });
    return !existingGroupName;
  };

  return {
    createGroup,
  };
};

module.exports = GroupController();
