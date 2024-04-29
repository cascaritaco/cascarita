const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("./config/passport");
const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const router = express.Router();

const GOOGLE_CLIENT_ID =
  "135465373081-fq0v2h8jcsv0vsb5v95ghlr740indnnv.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

function configureGoogleOAuth() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        done(null, profile);
      }
    )
  );

  //Note the serialization process is not very needed
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}

configureGoogleOAuth();
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
