const validator = require("validator");
const { Division } = require('../models');

const divisionController = {
    // Create a new division
    async create(req, res) {
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
    },

    // Archive a division by updating its status
    async archive(req, res) {
        try {
            const { id } = req.params;
            const division = await Division.findByPk(id);

            if (!division) {
                return res.status(404).json({ error: 'Division not found' });
            }

            // Update division status to archived
            await division.update({ archived: true });

            return res.status(200).json({ message: 'Division archived successfully' });
        } catch (error) {
            console.error('Error archiving division:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Update a division
    async update(req, res) {
        try {
            const { id } = req.params;
            const { group_id, name } = req.body;

            // Validate input data
            if (!validator.isInt(group_id, { min: 1 })) {
                return res.status(400).json({ error: 'Invalid group ID' });
            }
            if (!validator.isLength(name, { min: 1, max: 100 })) {
                return res.status(400).json({ error: 'Division name must be between 1 and 100 characters' });
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
    },

    // Get divisions by group id
    async getByGroupId(req, res) {
        try {
            const { groupId } = req.params;
            const divisions = await Division.findAll({ where: { group_id: groupId } });

            return res.status(200).json(divisions);
        } catch (error) {
            console.error('Error getting divisions by group id:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Delete a division
    async delete(req, res) {
        try {
            const { id } = req.params;
            const division = await Division.findByPk(id);

            if (!division) {
                return res.status(404).json({ error: 'Division not found' });
            }

            // Delete the division
            await division.destroy();

            return res.status(200).json({ message: 'Division deleted successfully' });
        } catch (error) {
            console.error('Error deleting division:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = divisionController;
