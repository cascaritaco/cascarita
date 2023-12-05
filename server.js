const path = require('path');
const express = require('express');
const sequelize = require('sequelize');
const teamController = require("./controllers/team.controller")
const app = express();
const port = process.env.HTTP_PORT || 3001;

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.post('/create/:name', teamController.createTeam);

app.get('/create/:name', (req, res) => {
  res.send('GET request received for creating a team with name ' + req.params.name);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});