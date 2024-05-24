"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
require("dotenv").config();

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";

const db = {};

let sequelize;
if (env === "development" || env === "production") {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      port: parseInt(process.env.DB_PORT, 10),
    }
  );
} else if (env === "testing") {
  sequelize = new Sequelize(
    process.env.TEST_DB_NAME,
    process.env.TEST_DB_USERNAME,
    process.env.TEST_DB_PASSWORD,
    {
      host: process.env.TEST_DB_HOST,
      dialect: process.env.TEST_DB_DIALECT,
      port: parseInt(process.env.TEST_DB_PORT, 10),
    }
  );
}

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database", error.message);
  });

// Export sequelize and DataTypes
module.exports.sequelize = sequelize;
module.exports.DataTypes = Sequelize.DataTypes;

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.DataTypes = Sequelize.DataTypes;
db.Sequelize = Sequelize;

module.exports = db;
