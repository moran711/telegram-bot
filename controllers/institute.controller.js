const instituteService = require('../services/institute.service.js');
class InstituteController {
  async addInstitute(institute) {
    return instituteService.addInstitute(institute);
  }
  async updateInstitute(id, institute) {
    try {
      return await instituteService.updateInstitute(id, institute);
    } catch (e) {
      return;
    }
  }
  async deleteInstitute(id) {
    try {
      return await instituteService.deleteInstitute(id);
    } catch (e) {
      return;
    }
  }
  async getInstituteById(_id) {
    let institute;
    try {
      institute = await instituteService.getInstituteById(_id);
    } catch (e) {
      return;
    }

    if (!institute) {
      return;
    }
    return institute;
  }
  async getAllInstitutes() {
    return await instituteService.getAllInstitutes();
  }
}

module.exports = new InstituteController();
