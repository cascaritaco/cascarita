"use strict";
const express = require('express');
const DivisionController = require('../controllers/division.controller');

const router = express.Router();

router.post('/', DivisionController.create);
router.put('/:id', DivisionController.update);
// router.put('/archive/:groupId', DivisionController.archiveByGroupId);
router.get('/group/:groupId', DivisionController.getByGroupId);
// router.get('/history/group/:groupId', DivisionController.getDeletedDivisionsByGroupId);
router.delete('/:id', DivisionController.delete);

module.exports = router;
