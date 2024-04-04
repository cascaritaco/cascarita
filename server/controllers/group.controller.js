"use strict";
const { Group } = require("../models");

const GroupController = function () {

  var _getGroup = async function(id){
    let currentGroup = await Group.findOne({
      where: {
        id: id,
      },
    });

    if (!currentGroup) {
      throw { field: "name", message: "Group with given ID was not found" };
    } else return currentGroup;
  }

  var getGroupById = async function (req, res, next) {
    try {
      return res.status(200).json({
        success: true,
        data: await _getGroup(req.params['id']),
      });

    } catch (error) {
      next(error);
    }
  };

  var createGroup = async function (req, res, next) {
    const newGroup = {
      name: req.body.name,
      street_address: req.body.street_address,
      city: req.body.city,
      state: req.body.state,
      zip_code: req.body.zip_code,
      logo_url: req.body.logo_url,
    };
    
    try {
      await Group.build(newGroup).validate();
      const result = await Group.create(newGroup);

      return res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
        next(error);
    }
  };

  var updateGroup = async function (req, res, next) {
    try {
      let currentGroup = await _getGroup(req.params['id']);

      Object.keys(req.body).forEach(key => {
        currentGroup[key] = req.body[key] ? req.body[key] : currentGroup[key];
      });
  
      await currentGroup.validate();
      await currentGroup.save();
  
      return res.status(200).json({
        success: true,
        data: currentGroup,
      });


    } catch (error) {
      next(error);
    }
  };

  return {
    getGroupById,
    createGroup,
    updateGroup,
  };
};

module.exports = GroupController();
