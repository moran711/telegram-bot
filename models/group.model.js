const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  value: { require: true, type: String },
  cathedra: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cathedra",
    require: true,
  },
});

module.exports = mongoose.model("Group", groupSchema);
