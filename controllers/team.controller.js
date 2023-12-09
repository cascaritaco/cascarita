const { Team } = require("./../models");

const TeamController = function(){

  var createTeam = async function(req, res){
    const { name } = req.params;
    const newTeam = {
      name: name,
    };
    const data = await Team.create(newTeam);
    return res.status(201).json({
        success: true,
        data: data
    })
  }

  return {
    createTeam, 
  }
}

module.exports = TeamController();