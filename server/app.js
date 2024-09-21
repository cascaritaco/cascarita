const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const http = require("http");
const { auth } = require("express-oauth2-jwt-bearer");
const helmet = require("helmet");
const path = require("path");
const Middlewares = require("./middlewares");
const { startMongoConnection } = require("./mongodb");
const StripeWebhooks = require("./routes/webhooks/stripe.webhooks");
const morgan = require("morgan");

const app = express();
app.set("port", process.env.SERVER_PORT || 3001);
app.use(express.static(path.join(__dirname, "../dist")));

const authConfig = require("./../client/auth_config.json");
if (
  !authConfig.domain ||
  !authConfig.audience ||
  authConfig.audience === "YOUR_API_IDENTIFIER"
) {
  console.log(
    "Exiting: Please make sure that auth_config.json is in place and populated with valid domain and audience values",
  );

  process.exit();
}

app.use(cookieParser());

// Enable CORS before using the router
app.use(morgan("dev"));
app.use(helmet());
app.use(
  cors({
    origin: `http://localhost:${app.get("port")}`,
    credentials: true,
  }),
);

const checkJwt = auth({
  audience: "https://dev-2vszya8j41e1n3fe.us.auth0.com/api/v2/", // Ensure this matches the value in your Auth0 application
  issuerBaseURL: "https://dev-2vszya8j41e1n3fe.us.auth0.com/",
  algorithms: ["RS256"], // Ensure you're using RS256
});

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

// Protected routes (requires JWT authentication)
app.use("/api/divisions", checkJwt, DivisionController);
app.use("/api/fields", checkJwt, FieldRoutes);
app.use("/api/groups", checkJwt, GroupRoutes);
app.use("/api/leagues", checkJwt, LeagueRoutes);
app.use("/api/players", checkJwt, PlayerRoutes);
app.use("/api/roles", checkJwt, RoleRoutes);
app.use("/api/seasons", checkJwt, SeasonRoutes);
app.use("/api/surveys", checkJwt, SurveyController);
app.use("/api/teams", checkJwt, TeamRoutes);
app.use("/api/users", checkJwt, UserRoutes);
app.use("/api/forms", checkJwt, FormRoutes);
app.use("/api/accounts", checkJwt, AccountRoutes);

app.get("*", function (req, res) {
  res.sendFile("index.html", { root: path.join(__dirname, "../dist") });
});

http.createServer(app).listen(app.get("port"), function () {
  console.log("Express server listening on port " + app.get("port"));
});

startMongoConnection().catch(console.dir);
module.exports = app;
