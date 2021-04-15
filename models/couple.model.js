const mongoose = require('mongoose');

const coupleSchema = new mongoose.Schema({
  uri: { require: true, type: String },
  teacher: { require: true, type: String },
  subject: { require: true, type: String },
  couple: { require: true, type: Number },
  type: { require: true, type: String },
});

module.exports = mongoose.model('Couple', coupleSchema);
