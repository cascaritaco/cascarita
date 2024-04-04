"use strict";
const { Group } = require("../models");

const GroupController = function () {
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

  return {
    createGroup,
  };
};

module.exports = GroupController();
