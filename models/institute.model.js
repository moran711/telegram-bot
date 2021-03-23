const mongoose = require('mongoose');

const instituteSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  value: String
});

module.exports = mongoose.model('Institute', instituteSchema);