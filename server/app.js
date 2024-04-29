const path = require("path");

const passport = require("./passport");
const session = require("express-session");
const http = require("http");
const express = require("express");
const router = express.Router();

require("dotenv").config();

const bodyParser = require("body-parser");
// const csrf = require("csurf");

const AuthRoutes = require("./routes/auth.routes");
const GroupRoutes = require("./routes/group.routes");
const RoleRoutes = require("./routes/role.routes");
const UserRoutes = require("./routes/user.routes");
const PlayerRoutes = require("./routes/player.routes");
const TeamRoutes = require("./routes/team.routes");
const LeagueRoutes = require("./routes/league.routes");
const FieldRoutes = require("./routes/field.routes");
const SeasonRoutes = require("./routes/season.routes");
const DivisionController = require("./routes/division.routes");
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
    secret: "SECRET",
    resave: false,
    saveUninitialized: true,
  })
);

// Add the routes specific to your models here
router.use("/group", GroupRoutes);
router.use("/role", RoleRoutes);
router.use("/user", UserRoutes);
router.use("/player", PlayerRoutes);
router.use("/league", LeagueRoutes);
router.use("/field", FieldRoutes);
router.use("/seasons", SeasonRoutes);
router.use("/divisions", DivisionController);
router.use("/team", TeamRoutes);
router.use("/auth", AuthRoutes);
// router.use(csrf());

function init() {
  router.get("*", function (req, res) {
    res.sendFile("index.html", { root: path.join(__dirname, "../dist") });
  });

  http.createServer(app).listen(app.get("port"), function () {
    console.log("Express server listening on port " + app.get("port"));
  });
}

init();
module.exports = app;
