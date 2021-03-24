const mongoose = require("mongoose");

const sceduleSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  forWeek: [
    {
      uri: { require: true, type: String },
      teacher: { require: true, type: String },
      subject: { require: true, type: String },
      number: { require: true, type: Number },
    },
  ],
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    require: true,
  },
});

module.exports = mongoose.model("Scedule", sceduleSchema);
