const groupService = require('../services/group.service.js');

class GroupController {
  async addGroup(group) {
    return await groupService.addGroup(group);
  }
  async addGroups(groups, instituteId) {
    return groups.forEach(async (group) => {
      const isGroupExist = (
        await this.getAllGroups({ value: group, institute: instituteId })
      ).length;
      return isGroupExist
        ? null
        : this.addGroup({ value: group, institute: instituteId });
    });
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
