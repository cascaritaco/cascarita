"use strict";
const validator = require("validator");
const { Division, Group } = require('../models');
const { DivisionHistory } = require('../modelsHistory');

const DivisionController = function () {
    var create = async function (req, res) {
        try {
            // Extract division data from the request body
            const { group_id, name } = req.body;

            // Validate input data
            if (!validator.isInt(group_id, { min: 1 })) {
                return res.status(400).json({ error: 'Invalid group ID' });
            }
            if (!validator.isLength(name, { min: 1, max: 100 })) {
                return res.status(400).json({ error: 'Division name must be between 1 and 100 characters' });
            }

            // Check if division name is unique within the group
            const existingDivision = await Division.findOne({ where: { group_id, name } });
            if (existingDivision) {
                return res.status(400).json({ error: 'Division name is already taken.' });
            }

            // Create the division in the database
            const division = await Division.create({ group_id, name });

            // Respond with the created division
            return res.status(201).json(division);
        } catch (error) {
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

            // Validate input data
            if (!validator.isInt(group_id, { min: 1 })) {
                return res.status(400).json({ error: 'Invalid group ID' });
            }
            if (!validator.isLength(name, { min: 1, max: 100 })) {
                return res.status(400).json({ error: 'Division name must not be null' });
            }

            // Check if the division exists
            const division = await Division.findByPk(id);
            if (!division) {
                return res.status(404).json({ error: 'Division not found' });
            }
            // Check if the updated name conflicts with an existing division 
            if (name !== division.name) {
                const existingDivision = await Division.findOne({ where: { group_id: division.group_id, name } });
                if (existingDivision) {
                    return res.status(400).json({ error: 'Division name is already taken.' });
                }
            }            

            // Update the division
            await division.update({ group_id, name });

            // Respond with the updated division
            return res.status(200).json(division);
        } catch (error) {
            console.error('Error updating division:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };

    var getByGroupId = async function (req, res) {
        try {
            const { groupId } = req.params;
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

            // Find the division to delete
            const division = await Division.findByPk(id);
            if (!division) {
                return res.status(404).json({ error: 'Division not found' });
            }

            // Archive the division before deletion
            await division.update({ archived: true });
            await DivisionHistory.create({ division_id: division.id, archived_at: new Date() });

            // Delete the division
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
                include: [
                    {
                        model: Division, // Include Division model
                        as: 'division', // Alias for the association
                        attributes: ['id', 'name'], // Specify attributes to include from Division
                        include: [
                            {
                                model: Group, // Include Group model associated with Division
                                as: 'group', // Alias for the association
                                attributes: ['id', 'name'], // Specify attributes to include from Group
                            }
                        ]
                    }
                ]
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
