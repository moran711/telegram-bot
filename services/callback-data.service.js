const callbackDataModel = require('../models/callback-data.model');

class CallbackDataService {
  async addCallbackData(data) {
    const callbackData = new callbackDataModel({
      ...data,
    });
    return await callbackData.save();
  }
  async updateCallbackData(id, data) {
    return callbackDataModel.findByIdAndUpdate(id, data, { new: true });
  }
  async deleteCallbackData(id) {
    return await callbackDataModel.findByIdAndDelete(id).exec();
  }
  async getCallbackDataById(_id) {
    return await callbackDataModel.findOne({ _id }).exec();
  }
  async getAllCallbackDatas(
    query = {},
    sort = {
      createdAt: -1,
    }
  ) {
    return await callbackDataModel.find(query).sort(sort);
  }
}

module.exports = new CallbackDataService();
