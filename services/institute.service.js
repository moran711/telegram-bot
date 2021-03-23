const instituteModel = require("../models/institute.model");


class InstituteService {
  async addInstitute(data) {
    const institute = new instituteModel({
      ...data
    });
    return await institute.save();
  }
  async updateInstitute(id, data) {
    return instituteModel.findByIdAndUpdate(id, data, { new: true });
  }
  async deleteInstitute(id) {
    return await instituteModel.findByIdAndDelete(id).exec()
  } 
  async getInstituteById(_id) {
    return await instituteModel.findOne({_id}).exec();
  }
  async getAllInstitutes() {
    return await instituteModel.find();
  }
}

module.exports = new InstituteService();
