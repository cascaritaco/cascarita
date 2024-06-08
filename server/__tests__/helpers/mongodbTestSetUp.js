"use strict";

import { MongoMemoryServer } from "mongodb-memory-server";

const mongoose = require("mongoose");

const MongodbTestSetUp = function () {
  let mongod;

  const connect = async function () {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
  };

  const disconnect = async function () {
    await mongoose.disconnect();
    if (mongod) {
      await mongod.stop();
    }
  };

  return {
    connect,
    disconnect,
  };
};

module.exports = MongodbTestSetUp();
