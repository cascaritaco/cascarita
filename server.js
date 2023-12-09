const express = require('express');
const sequelize = require('sequelize');
const TeamController = require("./controllers/team.controller")
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.post('/create/:name', TeamController.createTeam);

app.get('/create/:name', (req, res) => {
  res.send('GET request received for creating a team with name ' + req.params.name);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});