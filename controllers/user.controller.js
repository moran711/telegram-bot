const userService = require('../services/user.service.js');
const {LoadDataError} = require('../errors');

class UserController {
  async addUser(user) {
    return await userService.addUser(user);
  }
  async updateUser(id, user) {
    try {
      return await userService.updateUser(id, user);
    } catch (e) {
      return;
    }
  }
  async deleteUser(id) {
    try {
      return await userService.deleteUser(id);
    } catch (e) {
      return;
    }
  }
  async getUserById(_id) {
    let user;
    try {
      user = await userService.getUserById(_id);
    } catch (e) {
      return;
    }

    if (!user) {
      return;
    }
    return user;
  }
  async getAllUsers() {
    return await userService.getAllUsers();
  }
}

module.exports = new UserController();
