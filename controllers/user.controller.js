const userService = require('../services/user.service.js');

class UserController {
  async addUser(user) {
    if (!user.subscriptions) {
      user.subscriptions = [];
    }
    return await userService.addUser(user);
  }
  async isUserExist(chatId) {
    const candidates = this.getAllUsers({ chatId });
    return !!(await candidates).length;
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
  async getAllUsers(query) {
    return await userService.getAllUsers(query);
  }
}

module.exports = new UserController();
