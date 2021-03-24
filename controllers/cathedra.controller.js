const cathedraService = require("../services/cathedra.service.js");
const { LoadDataError } = require("../errors");

class CathedraController {
  async addCathedra(cathedra) {
    return await cathedraService.addCathedra(cathedra);
  }
  async updateCathedra(id, cathedra) {
    try {
      return await cathedraService.updateCathedra(id, cathedra);
    } catch (e) {
      return;
    }
  }
  async deleteCathedra(id) {
    try {
      return await cathedraService.deleteCathedra(id);
    } catch (e) {
      return;
    }
  }
  async getCathedraById(_id) {
    let cathedra;
    try {
      cathedra = await cathedraService.getCathedraById(_id);
    } catch (e) {
      return;
    }

    if (!cathedra) {
      return;
    }
    return cathedra;
  }
  async getAllCathedras(query) {
    return await cathedraService.getAllCathedras(query);
  }
}
module.exports = new CathedraController();
