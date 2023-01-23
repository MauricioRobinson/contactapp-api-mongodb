const mongoose = require("mongoose");
const config = require("../config/config");

const URI = config.dbURI;

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(URI, {
      useNewUrlParser: true,
    });
    console.log("Connected to database");
  } catch (error) {
    console.error("Error while trying to connect to the DB", error.message);
    next(error);
  }
};

module.exports = connectDB;
