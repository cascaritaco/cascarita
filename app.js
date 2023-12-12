const path = require('path');
const express = require('express');
const sequelize = require('sequelize');
const teamController = require("./controllers/team.controller")
const UserController = require("./controllers/user.controller")
const GroupController = require("./controllers/group.controller")
const RoleController = require("./controllers/role.controller")

const bodyParser = require('body-parser');

const http = require('http');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 80)
app.use(express.static(path.join(__dirname, 'client', 'build')));

function init() {
  app.get('*', function(req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, 'client', 'build')});
  });

  app.post('/create/:name', teamController.createTeam);
  app.post('/user', UserController.registerUser);
  app.post('/newgroup', GroupController.createGroup);
  app.post('/newrole', RoleController.createRole);

  http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
  });
}

init();