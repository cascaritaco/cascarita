const { Team } = require("./../models");

async function createTeam(req, res) {
    const { name } = req.params;
    console.log({name});
    
    let m = Team.logMessage('Testing logMessage method in Team model');
    Team.logMessage('Testing logMessage method in Team model');

    const newTeam = {
      name: name,
    };
    let data = await Team.create(newTeam);
    return res.status(201).json({
        success: true,
        data: data
    })
}
  
module.exports = {
  createTeam,
};