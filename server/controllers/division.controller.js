"use strict";

const { Division, Group } = require('../models');

const isDivisionNameUnique = async (groupId, name) => {
    const existingDivision = await Division.findOne({ where: { group_id: groupId, name: name } });
    return !existingDivision;
};

const DivisionController = {
    create: async function (req, res) {
        try {
            const { group_id, name } = req.body;

            const group = await Group.findByPk(group_id);
            if (!group) {
                return res.status(400).json({ error: 'Group does not exist' });
            }

            const isUnique = await isDivisionNameUnique(group_id, name);
            if (!isUnique) {
                return res.status(400).json({ error: 'Division name is already taken.' });
            }

            const division = await Division.create({ group_id, name });

            return res.status(201).json(division);
        } catch (error) {
            console.error('Error creating division:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    update: async function (req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const division = await Division.findByPk(id);
            if (!division) {
                return res.status(404).json({ error: 'Division not found' });
            }

            const group_id = division.group_id;
            const isUnique = await isDivisionNameUnique(group_id, name);
            if (!isUnique) {
                return res.status(400).json({ error: 'Division name is already taken.' });
            }

            await division.update({ name });

            return res.status(200).json(division);
        } catch (error) {
            console.error('Error updating division:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    getByGroupId: async function (req, res) {
        try {
            const { groupId } = req.params;

            const group = await Group.findByPk(groupId);
            if (!group) {
                return res.status(404).json({ message: "Group with given ID has no divisions or not found" });
            }

            const divisions = await Division.findAll({ where: { group_id: groupId } });

            if (divisions.length === 0) {
                return res.status(404).json({ message: "No divisions found for the given group ID" });
            }

            return res.status(200).json(divisions);
        } catch (error) {
            console.error('Error getting division by group id:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    delete: async function (req, res) {
        try {
            const { id } = req.params;

            const division = await Division.findByPk(id);
            if (!division) {
                return res.status(404).json({ error: 'Division not found' });
            }

            await division.destroy();

            return res.status(204).json({ message: 'Division deleted successfully' });
        } catch (error) {
            console.error('Error deleting division:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = DivisionController;
