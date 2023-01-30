const boom = require("@hapi/boom");
const User = require("./../db/models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

class UserService {
  constructor() {}

  async getAllUsers() {
    const users = User.find();

    if (!users) {
      throw boom.badRequest();
    }

    return users;
  }

  async getUser(id) {
    const user = await User.findById(id);

    if (!user) {
      throw boom.notFound("User not found");
    }

    return user;
  }

  async getUserByEmail(email) {
    const user = await User.find().where(email);

    if (!user) {
      throw boom.notFound("User not found");
    }

    return user;
  }

  async signToken(_id, firstName, lastName) {
    const token = await jwt.sign(
      { _id, firstName, lastName },
      config.jwtSecret,
      {
        expiresIn: "1h",
      }
    );

    return token;
  }

  async signupUser(data) {
    const { email } = data;
    const searchUser = await User.findOne({ email });

    if (searchUser) {
      throw boom.badRequest("The user already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, salt);
    const user = await User.create({ ...data, password: hash });

    if (!user) {
      throw boom.badRequest("We could't create the user. Please try again!");
    }

    return user;
  }

  async loginUser(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
      throw boom.notFound("Username not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.badRequest("Invalid password");
    }

    return user;
  }

  async updateUser(id, data) {
    const user = await User.findByIdAndUpdate(
      { _id: id },
      {
        $set: data,
      },
      { new: true }
    );

    if (!user) {
      throw boom.notFound("User not found");
    }

    return user;
  }

  async deleteUser(id) {
    const user = await User.findByIdAndRemove({ _id: id });

    if (!user) {
      throw boom.notFound("User not found");
    }

    return {
      message: `${user.firstName} ${user.lastName} has been removed`,
    };
  }
}

module.exports = UserService;
