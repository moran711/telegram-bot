const userModel = require('../models/user.model');

class UserService {
  async addUser(data) {
    const user = new userModel({
      ...data,
    });
    return await user.save();
  }
  async updateUser(id, data) {
    return userModel.findByIdAndUpdate(id, data, { new: true });
  }
  async deleteUser(id) {
    return await userModel.findByIdAndDelete(id).exec();
  }
  async getUserById(_id) {
    return await userModel.findOne({ _id }).exec();
  }
  async getAllUsers(
    query,
    sort = {
      createdAt: -1,
    }
  ) {
    return await userModel.find(query).sort(sort);
  }
}

module.exports = new UserService();
