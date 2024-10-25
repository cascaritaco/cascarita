"use strict";

const mongoose = require("mongoose");
require("dotenv").config();

/**
 * Attempts to start a connection to the MongoDB Atlas cluster with retry logic.
 */
async function startMongoConnection() {
  const mongo = {
    username: process.env.MONGO_CLUSTER_USERNAME,
    password: process.env.MONGO_CLUSTER_PASSWORD,
    dbName: process.env.MONGO_CLUSTER_DB_NAME,
    url: process.env.MONGO_CLUSTER_URL,
    appName: process.env.MONGO_CLUSTER_APP_NAME,
  };
  const uri = `mongodb+srv://${mongo.username}:${mongo.password}@${mongo.url}/${mongo.dbName}`;

  const maxRetries = 5;
  let retryCount = 0;
  let connected = false;

  while (!connected && retryCount < maxRetries) {
    try {
      await mongoose.connect(uri);
      console.log("Connected to Mongoose cluster.");
      connected = true;
    } catch (err) {
      retryCount++;
      console.log(
        `Connection attempt ${retryCount} failed. Error: ${err.message}`,
      );
      if (retryCount < maxRetries) {
        const waitTime = Math.pow(2, retryCount) * 1000; // Exponential backoff
        console.log(`Retrying in ${waitTime / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      } else {
        console.log(
          "Max retries reached. Could not connect to Mongoose cluster.",
        );
      }
    }
  }
}

module.exports = {
  startMongoConnection,
};
