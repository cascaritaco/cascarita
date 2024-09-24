const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { sequelize, DataTypes } = require("./models/index");
const User = require("./models/user")(sequelize, DataTypes);

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
    first_name: user.first_name,
    last_name: user.last_name,
    group_id: user.group_id,
    role_id: user.role_id,
  });
});

passport.deserializeUser(async (serializedUser, done) => {
  try {
    done(null, serializedUser);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
