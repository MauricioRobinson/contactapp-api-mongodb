const { Strategy } = require("passport-local");
const UserService = require("./../../../services/user.service");
const service = new UserService();

const LocalStategy = new Strategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    const user = await service.loginUser(email, password);

    if (!user) return done(null, false);

    return done(null, user);
  }
);

module.exports = LocalStategy;
