"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
require("dotenv").config();

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";

const configFilePath = path.join(__dirname, "../config/config.json");
const config = require(configFilePath);

const configManager = {
  updateConfigFile: () => {
    const environmentConfig = {
      username: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || null,
      database: process.env.DB_NAME || "test_db",
      host: process.env.DB_HOST || "127.0.0.1",
      dialect: process.env.DB_DIALECT || "mysql",
      port: parseInt(process.env.DB_PORT, 10) || 3306,
    };
    const newConfig = {
      ...config,
    };

    newConfig[env] = environmentConfig;
    fs.writeFileSync(configFilePath, JSON.stringify(newConfig, null, 2));
  },
};

const db = {};
// NOTE: we will ignore the testing as its configuration is present within config.json
if (env !== "testing") {
  configManager.updateConfigFile();
}

let sequelize;
const dbConfig = require(__dirname + "/../config/config.json")[env];

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[dbConfig.use_env_variable], dbConfig);
} else {
  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    dbConfig
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
db.Sequelize = Sequelize;

module.exports = db;
