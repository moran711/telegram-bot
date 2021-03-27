const sceduleService = require('../services/scedule.service.js');

class SceduleController {
  async addScedule(scedule) {
    return await sceduleService.addScedule(scedule);
  }
  async updateScedule(id, scedule) {
    try {
      return await sceduleService.updateScedule(id, scedule);
    } catch (e) {
      return;
    }
  }
  async deleteScedule(id) {
    try {
      return await sceduleService.deleteScedule(id);
    } catch (e) {
      return;
    }
  }
  async getSceduleById(_id) {
    let scedule;
    try {
      scedule = await sceduleService.getSceduleById(_id);
    } catch (e) {
      return;
    }

    if (!scedule) {
      return;
    }
    return scedule;
  }
  async getAllScedules(query) {
    return await sceduleService.getAllScedules(query);
  }
}
module.exports = new SceduleController();
