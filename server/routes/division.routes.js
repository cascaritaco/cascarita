"use strict";
const express = require('express');
const DivisionController = require('../controllers/division.controller');

const router = express.Router();

router.post('/', DivisionController.create);
router.patch('/:id', DivisionController.update);
router.get('/group/:groupId', DivisionController.getByGroupId);
router.delete('/:id', DivisionController.delete);

module.exports = router;
