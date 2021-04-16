const callbackDataService = require('../services/callback-data.service');

class CallbackDataController {
  async addCallbackData(data) {
    return await callbackDataService.addCallbackData(data);
  }
  async updateCallbackData(id, data) {
    try {
      return await callbackDataService.updateCallbackData(id, data);
    } catch (e) {
      return;
    }
  }
  async deleteCallbackData(id) {
    try {
      return await callbackDataService.deleteCallbackData(id);
    } catch (e) {
      return;
    }
  }
  async getCallbackDataById(_id) {
    let data;
    try {
      data = await callbackDataService.getCallbackDataById(_id);
    } catch (e) {
      return;
    }

    if (!data) {
      return;
    }
    return data;
  }
  async getAllCallbackDatas(query) {
    return await callbackDataService.getAllCallbackDatas(query);
  }
}
module.exports = new CallbackDataController();
