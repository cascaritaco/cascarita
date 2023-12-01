'use strict';

const Team = require("../models/team");

async function createTeam(req, res) {
    const { name } = req.params;
    console.log({name});
    Team.logMessage('Testing logMessage method in Team model');
    // try {
    //   const newTeam = await Team.createTeam({ name });
    //   return res.status(201).json({ team: newTeam });
    // } catch (error) {
    //   console.error('Error creating team:', error);
    //   return res.status(500).json({ error: 'Internal Server Error' });
    // }
  }
  
  module.exports = {
    createTeam,
  };