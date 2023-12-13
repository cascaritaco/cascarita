"use strict";

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.post('/register', UserController.registerUser);

router.post('/login', UserController.logInUser);

// router.post('/login', passport.authenticate('local'), (req, res) => {
//     const welcomeMessage = req.user
//     ? `Welcome, ${req.user.firstName} ${req.user.lastName}`
//     : null;
//   res.json({ message: welcomeMessage });
//   });
  
module.exports = router;
