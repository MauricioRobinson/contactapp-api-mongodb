const passport = require("passport");
const LocalStategy = require("./strategies/local.stategy");
const JWTStategy = require("./strategies/jwt.strategy");

passport.use(LocalStategy);
passport.use(JWTStategy);
