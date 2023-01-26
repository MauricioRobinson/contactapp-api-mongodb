const { Strategy, ExtractJwt } = require("passport-jwt");
const config = require("./../../../config/config");

const JWTStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
  },
  (payload, done) => {
    return done(null, payload);
  }
);

module.exports = JWTStrategy;
