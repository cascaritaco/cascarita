"use strict";

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.post('/register', UserController.registerUser);

router.post('/login', UserController.logInUser);

module.exports = router;