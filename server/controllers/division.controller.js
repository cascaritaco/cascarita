"use strict";

const { Division, Group } = require("../models");
const modelByPk = require("./utility");

const isDivisionNameUnique = async (groupId, name) => {
  const division = await Division.findOne({
    where: {
      group_id: groupId,
      name: name,
    },
  });
  return !division;
}

const DivisionController = {
  getByGroupId: async function (req, res, next) {
    const { groupId } = req.params;

    try {
      await modelByPk(res, Group, groupId);

      const divisions = await Division.findAll({
        where: {
          group_id: groupId,
        },
      });
      res.json(divisions);
    } catch (error) {
      next(error);
    }
  },
  create: async function (req, res, next) {
    const form = {
      group_id: req.body.group_id,
      name: req.body.name
    };

    try {
      await modelByPk(res, Group, form.group_id);
      const isUnique = await isDivisionNameUnique(form.group_id, form.name);
      if (!isUnique) {
        res.status(400);
        throw new Error("Division name already taken");
      }
      await Division.build(form).validate();

      const division = await Division.create(form);
      res.status(201).json(division);
    } catch (error) {
      next(error);
    }
  },
  update: async function (req, res, next) {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const division = await modelByPk(res, Division, id);
      const isUnique = await isDivisionNameUnique(division.group_id, name);
      if (!isUnique) {
        res.status(400);
        throw new Error("Division name already taken");
      }

      division.name = name;
      await division.validate();
      await division.save();
      res.json(division);
    } catch (error) {
      next(error);
    }
  },
  delete: async function (req, res, next) {
    const { id } = req.params;

    try {
      const division = await modelByPk(res, Division, id);

      await division.destroy();
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
};

module.exports = DivisionController;
