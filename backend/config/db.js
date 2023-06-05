const mongoose = require('mongoose');
const colors = require("colors");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);

    console.log(`DB connected: ${connect.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
}

module.exports = connectDB;