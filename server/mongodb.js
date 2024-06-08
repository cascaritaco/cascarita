"use strict";

const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");

require("dotenv").config();

/**
 * Attemps to start a connection to the MongoDB Atlas cluster.
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
  try {
    await mongoose.connect(uri);
    console.log("Connected to Mongoose cluster.");
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  startMongoConnection,
};
