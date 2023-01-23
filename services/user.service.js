const boom = require("@hapi/boom");
const User = require("./../db/models/user.model");

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

  async createUser(data) {
    const user = await User.create(data);

    if (!user) {
      throw boom.badRequest();
    }

    return user;
  }

  async updateUser(id, data) {
    const user = await User.findByIdAndUpdate(
      id,
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
    const user = await User.findByIdAndRemove(id);

    if (!user) {
      throw boom.notFound("User not found");
    }

    return {
      message: `${user.firstName} ${user.lastName} has been removed`,
    };
  }
}

module.exports = UserService;
