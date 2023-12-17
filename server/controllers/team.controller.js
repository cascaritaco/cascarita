const { Team } = require("./../models");

async function createTeam(req, res) {
  const { name } = req.params;

  const newTeam = {
    name: name,
  };
  let data = await Team.create(newTeam);

  return res.status(201).json({
    success: true,
    data: data,
  });
}

module.exports = {
  createTeam,
};
