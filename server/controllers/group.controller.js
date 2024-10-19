"use strict";
const { Group } = require("../models");

const GroupController = function () {
  var _getGroup = async function (id) {
    let currentGroup = await Group.findOne({
      where: {
        id: id,
      },
    });

    if (!currentGroup) {
      throw new Error("group with given id was not found");
    } else return currentGroup;
  };

  var _getGroupByName = async function (name) {
    let groups = await Group.findAll({
      where: {
        name: name,
      },
    });
    if (!groups) {
      throw new Error("No groups found with the given name");
    } else return groups;
  };

  var getGroupById = async function (req, res, next) {
    try {
      const group = await _getGroup(req.params["id"]);
      return res.status(200).json(group);
    } catch (error) {
      next(error);
    }
  };

  var getAllGroups = async function (req, res, next) {
    try {
      let allGroups = await Group.findAll();
      return res.status(200).json(allGroups);
    } catch (error) {
      next(error);
    }
  };

  var getGroupByName = async function (name) {
    try {
      const groupName = name;
      if (!groupName) {
        return null;
      }
      const groups = await _getGroupByName(groupName);

      return groups;
    } catch (error) {
      console.error("error getting group by name: ", error);
    }
  };

  var createGroup = async function (groupInfo) {
    const newGroup = {
      name: groupInfo.name,
      street_address: groupInfo.street_address,
      city: groupInfo.city,
      state: groupInfo.state,
      zip_code: groupInfo.zip_code,
      logo_url: groupInfo.logo_url,
    };

    try {
      await Group.build(newGroup).validate();
      const createdGroup = await Group.create(newGroup);
      return createdGroup.id;
    } catch (error) {
      console.error("error creating group: ", error);
      throw new Error("failed to create group");
    }
  };

  var updateGroup = async function (req, res, next) {
    try {
      let currentGroup = await _getGroup(req.params["id"]);

      Object.keys(req.body).forEach((key) => {
        currentGroup[key] = req.body[key] ? req.body[key] : currentGroup[key];
      });

      await currentGroup.validate();
      await currentGroup.save();

      return res.status(200).json(currentGroup);
    } catch (error) {
      next(error);
    }
  };

  return {
    getGroupById,
    getAllGroups,
    getGroupByName,
    createGroup,
    updateGroup,
  };
};

module.exports = GroupController();
