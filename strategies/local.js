const LocalStrategy = require("passport-local");
const User = require("../models/user");
const HttpError = require("../utils/HttpError");

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new HttpError(404, "User not found.");
      }

      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });

        if (!user) {
          return done(null, false, {
            message: "Incorrect username or password. (username :P)",
          });
        }

        const isMatchingPassword = await user.validatePassword(password);
        if (!isMatchingPassword) {
          return done(null, false, {
            message: "Incorrect username or password. (password :P)",
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
};
