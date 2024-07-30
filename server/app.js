const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const session = require("express-session");
const http = require("http");
const path = require("path");
const Middlewares = require("./middlewares");
const passport = require("./passport");
const { startMongoConnection } = require("./mongodb");
const StripeWebhooks = require("./routes/webhooks/stripe.webhooks");

const app = express();
app.set("port", process.env.SERVER_PORT || 3001);
app.use(express.static(path.join(__dirname, "../dist")));

// app.use(
//   "/api/webhook/stripe",
//   express.raw({ type: "application/json" }),
//   StripeWebhooks,
// );

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

const secondsInAnHour = 60 * 60;
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: true,
  cookie: {
    httpOnly: true,
    sameSite: "strict",
    maxAge: secondsInAnHour * 1000,
  },
});
app.use(sessionMiddleware);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// Enable CORS before using the router
app.use(
  cors({
    origin: `http://localhost:${app.get("port")}`,
    credentials: true,
  }),
);

app.use(
  "/api/webhook/stripe",
  express.raw({ type: "application/json" }),
  StripeWebhooks,
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Error handler should be the last middleware used
app.use(Middlewares.errorHandler);

const AuthRoutes = require("./routes/auth.routes");
const DivisionController = require("./routes/division.routes");
const FieldRoutes = require("./routes/field.routes");
const GroupRoutes = require("./routes/group.routes");
const LeagueRoutes = require("./routes/league.routes");
const PlayerRoutes = require("./routes/player.routes");
const RoleRoutes = require("./routes/role.routes");
const SeasonRoutes = require("./routes/season.routes");
const SurveyController = require("./routes/survey.routes");
const TeamRoutes = require("./routes/team.routes");
const UserRoutes = require("./routes/user.routes");
const FormRoutes = require("./routes/form.routes");
const AccountRoutes = require("./routes/account.routes");

app.use("/api/auth", AuthRoutes);
app.use("/api/divisions", DivisionController);
app.use("/api/fields", FieldRoutes);
app.use("/api/groups", GroupRoutes);
app.use("/api/leagues", LeagueRoutes);
app.use("/api/players", PlayerRoutes);
app.use("/api/roles", RoleRoutes);
app.use("/api/seasons", SeasonRoutes);
app.use("/api", SurveyController);
app.use("/api/teams", TeamRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/forms", FormRoutes);
app.use("/api/accounts", AccountRoutes);

app.get("*", function (req, res) {
  res.sendFile("index.html", { root: path.join(__dirname, "../dist") });
});

http.createServer(app).listen(app.get("port"), function () {
  console.log("Express server listening on port " + app.get("port"));
});

startMongoConnection().catch(console.dir);
module.exports = app;
