"use strict";
const { Division, DivisionHistory, Group } = require('../models');

const DivisionController = function () {
    var create = async function (req, res) {
        try {
            // Extract division data from the request body
            const { group_id, name } = req.body;

            // Check if the provided group_id exists
            const group = await Group.findByPk(group_id);
            if (!group) {
                return res.status(400).json({ error: 'Group does not exist' });
            }

            // Create the division in the database
            const division = await Division.create({ group_id, name });

            // Respond with the created division
            return res.status(201).json(division);
        } catch (error) {
            // Handle validation errors
            if (error.name === 'SequelizeValidationError') {
                const validationErrors = error.errors.map((err) => ({
                    field: err.path,
                    message: err.message,
                }));
                return res.status(400).json({ error: 'Validation error', details: validationErrors });
            }
            // Handle other errors
            console.error('Error creating division:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    
    var archiveByGroupId = async function (req, res) {
        try {
            const { groupId } = req.params;

            // Find divisions by GroupID
            const divisions = await Division.findAll({ where: { group_id: groupId } });

            // Archive divisions and store in DivisionHistory
            for (const division of divisions) {
                await division.update({ archived: true });
                await DivisionHistory.create({ division_id: division.id, archived_at: new Date() });
            }

            return res.status(200).json({ message: 'Division archived successfully' });
        } catch (error) {
            console.error('Error archiving division by Group ID:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };

    var update = async function (req, res) {
        try {
            const { id } = req.params;
            const { group_id, name } = req.body;

            // Check if the provided group_id exists
            const group = await Group.findByPk(group_id);
            if (!group) {
                return res.status(400).json({ error: 'Group does not exist' });
            }

            // Update the division
            const division = await Division.findByPk(id);
            if (!division) {
                return res.status(404).json({ error: 'Division not found' });
            }

            await division.update({ group_id, name });

            // Respond with the updated division
            return res.status(200).json(division);
        } catch (error) {
            // Handle validation errors
            if (error.name === 'SequelizeValidationError') {
                const validationErrors = error.errors.map((err) => ({
                    field: err.path,
                    message: err.message,
                }));
                return res.status(400).json({ error: 'Validation error', details: validationErrors });
            }
            // Handle other errors
            console.error('Error updating division:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };

    var getByGroupId = async function (req, res) {
        try {
            const { groupId } = req.params;

            // Check if the provided group_id exists
            const group = await Group.findByPk(groupId);
            if (!group) {
                return res.status(400).json({ error: 'Group does not exist' });
            }

            // Get divisions by group id
            const divisions = await Division.findAll({ where: { group_id: groupId } });

            return res.status(200).json(divisions);
        } catch (error) {
            console.error('Error getting division by group id:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };

    var deleteDivision = async function (req, res) {
        try {
            const { id } = req.params;

            // Delete the division
            const division = await Division.findByPk(id);
            if (!division) {
                return res.status(404).json({ error: 'Division not found' });
            }

            await division.destroy();

            return res.status(200).json({ message: 'Division deleted successfully' });
        } catch (error) {
            console.error('Error deleting division:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };

    var getDeletedDivisionsByGroupId = async function (req, res) {
        try {
            const { groupId } = req.params;

            // Find deleted divisions from DivisionsHistory by GroupID
            const deletedDivisions = await DivisionHistory.findAll({
                where: { group_id: groupId },
                attributes: ['division_id', 'archived_at'], // Specify which attributes to include in the result
            });

            return res.status(200).json(deletedDivisions);
        } catch (error) {
            console.error('Error getting deleted divisions by Group ID:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };

    return {
        create,
        archiveByGroupId,
        update,
        getByGroupId,
        delete: deleteDivision,
        getDeletedDivisionsByGroupId
    };
};

module.exports = DivisionController();
