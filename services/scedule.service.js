const sceduleModel = require("../models/scedule.model");

class SceduleService {
  async addScedule(data) {
    const scedule = new sceduleModel({
      ...data,
    });
    return await scedule.save();
  }
  async updateScedule(id, data) {
    return sceduleModel.findByIdAndUpdate(id, data, { new: true });
  }
  async deleteScedule(id) {
    return await sceduleModel.findByIdAndDelete(id).exec();
  }
  async getSceduleById(_id) {
    return await sceduleModel.findOne({ _id }).exec();
  }
  async getAllScedules(query = {}) {
    return await sceduleModel.find(query);
  }
}

module.exports = new SceduleService();
