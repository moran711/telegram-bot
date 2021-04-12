const instituteService = require('../services/institute.service.js');
class InstituteController {
  async addInstitute(institute) {
    return instituteService.addInstitute(institute);
  }
  async addInstitutes(institutes) {
    return institutes.forEach(async (institute) => {
      const isInstituteExist = (
        await this.getAllInstitutes({ value: institute })
      ).length;
      return isInstituteExist ? null : this.addInstitute({ value: institute });
    });
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
  async getAllInstitutes(query = {}) {
    return await instituteService.getAllInstitutes(query);
  }
}

module.exports = new InstituteController();
