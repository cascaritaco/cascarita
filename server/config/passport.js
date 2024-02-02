"use strict";

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user || !(await user.validPassword(password))) {
          return done(null, false, { message: "Invalid email or password" });
        }

        return done(null, user);
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
    firstName: user.firstName,
    lastName: user.lastName,
    groupId: user.groupId,
    roleId: user.roleId,
  });
});

passport.deserializeUser(async (user, done) => {
  try {
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
