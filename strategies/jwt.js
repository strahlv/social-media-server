const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(
  catchAsync(function (id, done) {
    const user = await User.findById(id);
    if (user) {
      done(null, user);
    }
  })
);

passport.use(
  new JwtStrategy(
    opts,
    catchAsync(function (jwt_payload, done) {
      const user = await User.findOne({ username });

      if (user) {
        return done(null, user);
      }

      return done(null, false);
    })
  )
);
