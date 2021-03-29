const {
  getUserDataFromMessage,
} = require('../helpers/getUserDataFromMessage.js');
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
  async addSubscriptionForUser(msg, subscription) {
    if (!(await this.isUserExist)) {
      const user = getUserDataFromMessage(message);
      user.subscriptions = [];
      user.subscriptions.push(subscription);
      await this.addUser(user);
      return;
    }
    const user = await this.getUserByField('chatId', msg.chat.id);
    user.subscriptions.push(subscription);
    await this.updateUser(user._id, user);
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
  async checkIfUserHaveSubs(chatId, subId) {
    const user = await this.getUserByField('chatId', chatId);
    return !!user.subscriptions.filter((el) => el.id === subId).length;
  }
  async getUserByField(key, param) {
    let user;
    try {
      user = await userService.getUserByField({
        [key]: param,
      });
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
