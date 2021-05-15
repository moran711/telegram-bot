require('dotenv').config();
const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async () => {
  const db = process.env.MONGO_URI;
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    logger.info('MongoDB Connected...');
  } catch (err) {
    logger.error(err);
  }
};

module.exports = connectDB;
