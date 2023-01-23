require("dotenv").config();

const config = {
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  dbURI: process.env.DB_STRING_CONN,
};

module.exports = config;
