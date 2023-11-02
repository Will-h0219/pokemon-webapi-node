const mongoose = require('mongoose');
const { config } = require('./config');

async function dbConnection() {
  try {
    await mongoose.connect(config.connectionString);
    console.log('DB online');
  } catch (error) {
    console.log(error);
    throw new Error('Error trying to connect to the database');
  }
}

module.exports = { dbConnection };