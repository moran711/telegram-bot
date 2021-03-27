const cathedraModel = require('../models/cathedra.model');

class CathedraService {
  async addCathedra(data) {
    const cathedra = new cathedraModel({
      ...data,
    });
    return await cathedra.save();
  }
  async updateCathedra(id, data) {
    return cathedraModel.findByIdAndUpdate(id, data, { new: true });
  }
  async deleteCathedra(id) {
    return await cathedraModel.findByIdAndDelete(id).exec();
  }
  async getCathedraById(_id) {
    return await cathedraModel.findOne({ _id }).exec();
  }
  async getAllCathedras(query = {}) {
    return await cathedraModel.find(query);
  }
}

module.exports = new CathedraService();
