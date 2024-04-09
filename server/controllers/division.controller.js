"use strict";

const { Division, Group } = require('../models');

const DivisionController = function () {
    const isDivisionNameUnique = async (groupId, name) => {
        const existingDivision = await Division.findOne({ where: { group_id: groupId, name: name } });
        return !existingDivision; 
    };

    var create = async function (req, res) {
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
            if (error.name === 'SequelizeValidationError') {
                const validationErrors = error.errors.map((err) => ({
                    field: err.path,
                    message: err.message,
                }));
                return res.status(400).json({ error: 'Validation error', details: validationErrors });
            }
            console.error('Error creating division:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    


    // var archiveByGroupId = async function (req, res) {
    //     try {
    //         const { groupId } = req.body;

    //         const divisions = await Division.findAll({ where: { groupId } });

    //         for (const division of divisions) {
    //             await division.update({ archived: true });
    //             await divisionhistoryController.create({ group_id: groupId, name: division.name, archived_at: new Date() });
    //         }

    //         return res.status(200).json({ message: 'Division archived successfully' });
    //     } catch (error) {
    //         console.error('Error archiving division by Group ID:', error);
    //         return res.status(500).json({ error: 'Internal server error' });
    //     }
    // };
    

    var update = async function (req, res) {
        try {
            const { id } = req.params;
            const { group_id, name } = req.body;

            const group = await Group.findByPk(group_id);
            if (!group) {
                return res.status(400).json({ error: 'Group does not exist' });
            }

            const isUnique = await isDivisionNameUnique(group_id, name);
            if (!isUnique) {
                return res.status(400).json({ error: 'Division name is already taken.' });
            }

            const division = await Division.findByPk(id);
            if (!division) {
                return res.status(404).json({ error: 'Division not found' });
            }
            
            await division.update({ group_id, name });

            return res.status(200).json(division);
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                const validationErrors = error.errors.map((err) => ({
                    field: err.path,
                    message: err.message,
                }));
                return res.status(400).json({ error: 'Validation error', details: validationErrors });
            }
            console.error('Error updating division:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };

    var getByGroupId = async function (req, res) {
        try {
            const { group_id } = req.body;

            const group = await Group.findByPk(group_id);
            if (!group) {
                return res.status(400).json({ error: 'Group does not exist' });
            }

            const divisions = await Division.findAll({ where: { group_id } });

            return res.status(200).json(divisions);
        } catch (error) {
            console.error('Error getting division by group id:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };

    var deleteDivision = async function (req, res) {
        try {
            const { id } = req.body;

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

    // var getDeletedDivisionsByGroupId = async function (req, res) {
    //     try {
    //         const { groupId } = req.body;

    //         const deletedDivisions = await DivisionHistory.findAll({
    //             where: { group_id: groupId },
    //             attributes: ['division_id', 'archived_at']
    //         });

    //         return res.status(200).json(deletedDivisions);
    //     } catch (error) {
    //         console.error('Error getting deleted divisions by Group ID:', error);
    //         return res.status(500).json({ error: 'Internal server error' });
    //     }
    // };

    // var getDeletedDivisionsByGroupId = async function (req, res) {
    //     try {
    //         const { group_id, name } = req.body;

    //         const group = await Group.findByPk(group_id);
    //         if (!group) {
    //             return res.status(400).json({ error: 'Group does not exist' });
    //         }

    //         const deletedDivisions = archiveByGroupId(req, res); // Call archiveByGroupId function to archive the division

    //         return res.status(200).json(deletedDivisions);
    //     } catch (error) {
    //         console.error('Error getting deleted divisions by Group ID:', error);
    //         return res.status(500).json({ error: 'Internal server error' });
    //     }
    // };

    return {
        create,
        // archiveByGroupId,
        update,
        getByGroupId,
        delete: deleteDivision,
        // getDeletedDivisionsByGroupId
    };
};

module.exports = DivisionController();
