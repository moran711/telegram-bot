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
  async getAllUsers() {
    return await userModel.find();
  }
}

module.exports = new UserService();
