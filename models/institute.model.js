const mongoose = require("mongoose");

const instituteSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  value: { require: true, type: String },
});

module.exports = mongoose.model("Institute", instituteSchema);
