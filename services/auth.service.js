const boom = require("@hapi/boom");
const User = require("./../db/models/user.model");
const bcrypt = require("bcrypt");

class AuthService {
  constructor() {}

  async getUser(email, password) {
    const user = await User.findOne().where({ email: email });

    if (!user) {
      throw boom.unauthorized();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }

    return user;
  }
}

module.exports = AuthService;
