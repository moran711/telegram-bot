const sceduleModel = require('../models/scedule.model');

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
  async getAllScedules(
    query = {},
    sort = {
      createdAt: -1,
    }
  ) {
    return await sceduleModel.find(query).sort(sort);
  }
}

module.exports = new SceduleService();
