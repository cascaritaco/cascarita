const path = require("path");
const express = require("express");
const session = require('express-session');
const passport = require('./config/passport');
const teamController = require("./controllers/team.controller");
const http = require("http");
const router = express.Router();
require("dotenv").config();
const bodyParser = require("body-parser");
const GroupRoutes = require("./routes/group.routes");
const RoleRoutes = require("./routes/role.routes");
const UserRoutes = require("./routes/user.routes")

const app = express();
app.set("port", process.env.PORT || 80);
app.use(express.static(path.join(__dirname, "../dist")));
app.use("/api", router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  cookie: { secure: true } ,
  saveUninitialized: false,
  }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/group', GroupRoutes);
app.use('/role', RoleRoutes);
app.use('/user', UserRoutes);

function init() {
  app.get("*", function (req, res) {
    res.sendFile("index.html", { root: path.join(__dirname, "../dist") });
  });

  router.post("/create/:name", teamController.createTeam);

  http.createServer(app).listen(app.get("port"), function () {
    console.log("Express server listening on port " + app.get("port"));
  });
}

init();
