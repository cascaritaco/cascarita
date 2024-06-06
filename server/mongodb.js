"use strict";

const { MongoClient, ServerApiVersion } = require('mongodb');

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
  }
  const uri = `mongodb+srv://${mongo.username}:${mongo.password}@${mongo.url}/?retryWrites=true&w=majority&appName=${mongo.appName}`;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  await client.connect()
    .then((client) => client.db(mongo.dbName).command({ ping: 1 }))
    .then((_) => console.log("Connected to MongoDB cluster."))
    .catch((reason) => console.error("Failed to connect MongoDB cluster", reason))
    .finally(() => client.close());
}

module.exports = {
  startMongoConnection
};
