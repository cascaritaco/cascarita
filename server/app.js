const path = require("path");
const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const teamController = require("./controllers/team.controller");
const http = require("http");
const router = express.Router();

require("dotenv").config();

const bodyParser = require("body-parser");
const csrf = require("csurf");
const GroupRoutes = require("./routes/group.routes");
const RoleRoutes = require("./routes/role.routes");
const UserRoutes = require("./routes/user.routes");
const PlayerRoutes = require("./routes/player.routes");
const LeagueRoutes = require("./routes/league.routes");
const SeasonRoutes = require("./routes/season.routes");

const Middlewares = require("./middlewares");

const app = express();
app.set("port", process.env.PORT || 80);
app.use(express.static(path.join(__dirname, "../dist")));
app.use("/api", router);
app.use(Middlewares.errorHandler);

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  }),
);
router.use(passport.initialize());
router.use(passport.session());
router.use("/group", GroupRoutes);
router.use("/role", RoleRoutes);
router.use("/user", UserRoutes);
router.use("/player", PlayerRoutes);
router.use("/league", LeagueRoutes);
router.use("/season", SeasonRoutes);
router.use(csrf());

function init() {
  router.get("*", function (req, res) {
    res.sendFile("index.html", { root: path.join(__dirname, "../dist") });
  });

  router.post("/create/:name", teamController.createTeam);

  http.createServer(app).listen(app.get("port"), function () {
    console.log("Express server listening on port " + app.get("port"));
  });
}

init();
module.exports = app;
