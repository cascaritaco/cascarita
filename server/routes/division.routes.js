"use strict";
const express = require('express');
const divisionController = require('../controllers/division.controller');

const router = express.Router();

// Route for creating a new division
router.post('/', divisionController.create);

// Route for updating a division
router.put('/:id', divisionController.update);

// Route for archiving divisions by GroupID
router.put('/archive/:groupId', divisionController.archiveByGroupId);

// Route for getting divisions by GroupID
router.get('/group/:groupId', divisionController.getByGroupId);

// Route for getting deleted divisions by GroupID from DivisionsHistory

router.get('/history/group/:groupId', divisionController.getDeletedDivisionsByGroupId);

// Route for deleting a division by ID
router.delete('/:id', divisionController.delete);

module.exports = router;
