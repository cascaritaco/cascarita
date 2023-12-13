const path = require('path');
const express = require('express');
const sequelize = require('sequelize');
const teamController = require("./controllers/team.controller")
const http = require('http');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const app = express();
app.set('trust proxy', true)
app.set('port', process.env.PORT || 80)
app.use(methodOverride())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'client', 'build')));

function init() {
  app.get('*', function(req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, 'client', 'build')});
  });

  app.post('/create/:name', teamController.createTeam);

  http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
  });
}

init();