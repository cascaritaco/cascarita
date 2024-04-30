const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const cookieSession = require("cookie-session");
const passport = require("passport");
const express = require("express");
const cors = require("cors");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { sequelize, DataTypes } = require("./models/index");
const User = require("./models/user")(sequelize, DataTypes);

// TODO add to environment variables
const GOOGLE_CLIENT_ID = "";
const GOOGLE_CLIENT_SECRET = "";

function configureLocalAuth() {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ where: { email } });
          if (!user) {
            //|| !(await user.validPassword(password))) {
            return done(null, false, {
              message: "Invalid email or password",
            });
          }
          const token = jwt.sign(
            { userId: user.id, userEmail: user.email },
            "your_secret_key",
            {
              expiresIn: "1h",
            }
          );
          return done(null, user, { token: token });
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      group_id: user.group_id,
      role_id: user.role_id,
    });
  });

  passport.deserializeUser(async (user, done) => {
    try {
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}

// function configureGoogleOAuth() {
//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: GOOGLE_CLIENT_ID,
//         clientSecret: GOOGLE_CLIENT_SECRET,
//         callbackURL: "/api/auth/google/callback",
//       },
//       function (accessToken, refreshToken, profile, done) {
//         done(null, profile);
//       }
//     )
//   );

//   //Note the serialization process is not very needed
//   passport.serializeUser((user, done) => {
//     done(null, user);
//   });
//   passport.deserializeUser((user, done) => {
//     done(null, user);
//   });
// }

// configureGoogleOAuth();
configureLocalAuth();
router.use(
  cookieSession({
    name: "session",
    keys: ["openreplay"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
router.use(passport.initialize());
router.use(passport.session());
const app = express();
router.use(
  cors({
    origin: `http://localhost:${app.get("port")}`,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
