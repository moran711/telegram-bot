const { getCourse } = require('../helpers/getCourse.js');
const groupService = require('../services/group.service.js');

class GroupController {
  async addGroup(group) {
    return await groupService.addGroup(group);
  }
  async addGroups(groups, instituteId) {
    return groups.forEach(async (group) => {
      const groupName = group.trim();
      const course = getCourse(groupName);
      const isGroupExist = (
        await this.getAllGroups({ value: groupName, institute: instituteId })
      ).length;

      return isGroupExist
        ? null
        : this.addGroup({ value: groupName, institute: instituteId, course });
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
  async getGroupById(_id, populateInstitute = false) {
    let group;
    try {
      group = await groupService.getGroupById(_id, populateInstitute);
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
  async getAllGroupsWithInstitutes(query = {}) {
    return await groupService.getAllGroupsWithInstitutes(query);
  }
}

module.exports = new GroupController();
