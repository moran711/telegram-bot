const groupService = require('../services/group.service.js');
const {LoadDataError} = require('../errors');

class GroupController {
  async addGroup(group) {
    return await groupService.addGroup(group);
  }
  async updateGroup(id, group) {
    try {
      return await groupService.updateGroup(id, group);
    } catch (e) {
      return;
    }
  }
  async deleteGroup(id) {
    try {
      return await groupService.deleteGroup(id);
    } catch (e) {
      return;
    }
  }
  async getGroupById(_id) {
    let group;
    try {
      group = await groupService.getGroupById(_id);
    } catch (e) {
      return;
    }

    if (!group) {
      return;
    }
    return group;
  }
  async getAllGroups(query = {}) {
    return await groupService.getAllGroups(query);
  }
}

module.exports = new GroupController();
