const mongoose = require('mongoose');

const callbackDataSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  type: { require: true, type: String },
  pervious: {
    type: String,
  },
  current: {
    require: true,
    type: String,
  },
});

module.exports = mongoose.model('CallbackData', callbackDataSchema);
