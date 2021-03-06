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
  async getGroupById(_id, populateInstitute) {
    return populateInstitute
      ? await groupModel.findOne({ _id }).populate('institute').exec()
      : await groupModel.findOne({ _id }).exec();
  }
  async getAllGroups(
    query,
    sort = {
      createdAt: -1,
    }
  ) {
    return await groupModel.find(query);
  }
  async getAllGroupsWithInstitutes(
    query,
    sort = {
      createdAt: -1,
    }
  ) {
    return await groupModel.find(query).populate('institute').exec();
  }
}

module.exports = new GroupService();
