require('dotenv').config();

const config = {
  port: process.env.PORT,
  connectionString: process.env.CONNECTION_STRING
};

module.exports = { config };