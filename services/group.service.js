const groupModel = require('../models/group.model');

class GroupService {
  async addGroup(data) {
    const group = new groupModel({
      ...data,
    });
    return await group.save();
  }
  async updateGroup(id, data) {
    return groupModel.findByIdAndUpdate(id, data, { new: true });
  }
  async deleteGroup(id) {
    return await groupModel.findByIdAndDelete(id).exec();
  }
  async getGroupById(_id) {
    return await groupModel.findOne({ _id }).exec();
  }
  async getAllGroups(query) {
    return await groupModel.find(query);
  }
}

module.exports = new GroupService();
