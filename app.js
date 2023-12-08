//hello I am here
const path = require('path');
const express = require('express');
const sequelize = require('sequelize');
const teamController = require("./controllers/team.controller")
const dotenv = require('dotenv').config()
const http = require('http');

const app = express();
app.set('port', process.env.PORT || 80)
app.use(express.static(path.join(__dirname, 'client', 'build')));

function init() {
  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  app.post('/create/:name', teamController.createTeam);

  http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
  });
}

init();