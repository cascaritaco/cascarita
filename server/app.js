const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("./passport");
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const Middlewares = require("./middlewares");

const app = express();

app.set("port", process.env.PORT || 80);
app.use(express.static(path.join(__dirname, "../dist")));

const sessionMiddleware = session({
  secret: "secret", //TODO: replace with valid secret
  saveUninitialized: false,
  resave: true,
  cookie: {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 3600000, // 1 hour session
  },
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessionMiddleware);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
// Enable CORS before using the router
app.use(
  cors({
    origin: `http://localhost:${app.get("port")}`,
    credentials: true,
  })
);
app.use(Middlewares.errorHandler);

// Add the routes specific to your models here
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

app.use("/api/group", GroupRoutes);
app.use("/api/role", RoleRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/player", PlayerRoutes);
app.use("/api/league", LeagueRoutes);
app.use("/api/field", FieldRoutes);
app.use("/api/seasons", SeasonRoutes);
app.use("/api/divisions", DivisionController);
app.use("/api/team", TeamRoutes);
app.use("/api/auth", AuthRoutes);

function init() {
  app.get("*", function (req, res) {
    res.sendFile("index.html", { root: path.join(__dirname, "../dist") });
  });

  http.createServer(app).listen(app.get("port"), function () {
    console.log("Express server listening on port " + app.get("port"));
  });
}

init();
module.exports = app;
