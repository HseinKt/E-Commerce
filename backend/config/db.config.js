// DB setup, external configs
const mongoose = require('mongoose'); //import mongoose

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB Connection Failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;