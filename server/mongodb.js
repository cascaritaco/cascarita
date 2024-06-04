"use strict";

const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");

// const Test = require("./mongoModel/test");

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
  // const uri = `mongodb+srv://${mongo.username}:${mongo.password}@${mongo.url}/?retryWrites=true&w=majority&appName=${mongo.appName}/${mongo.dbName}`;
  const uri = `mongodb+srv://${mongo.username}:${mongo.password}@${mongo.url}/${mongo.dbName}`;
  try {
    await mongoose.connect(uri);
    console.log("Connected to Mongoose cluster.");

    // try {
    //   let result = await Test.findById("665e615af11c1ed1dc93189f").exec();
    //   // console.log("Test document successfully grabbed:", result);
    //   console.log("Test document successfully grabbed:", result);
    // } catch (error) {
    //   console.error("Error grabbing test doc:", error);
    // }
  } catch (err) {
    console.log(err);
  }
  // const client = new MongoClient(uri, {
  //   serverApi: {
  //     version: ServerApiVersion.v1,
  //     strict: true,
  //     deprecationErrors: true,
  //   },
  // });

  // await client
  //   .connect()
  //   .then((client) => client.db(mongo.dbName).command({ ping: 1 }))
  //   .then((_) => console.log("Connected to MongoDB cluster."))
  //   .catch((reason) =>
  //     console.error("Failed to connect MongoDB cluster", reason),
  //   )
  //   .finally(() => client.close());

  // try {
  //   await client.connect();
  //   await client.db(mongo.dbName).command({ ping: 1 });
  //   console.log("Connected to MongoDB cluster.");
  //   // return client;
  // } catch (error) {
  //   console.error("Failed to connect MongoDB cluster", error);
  // }
}

module.exports = {
  startMongoConnection,
};
