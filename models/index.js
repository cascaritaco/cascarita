'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

let sequelize;
sequelize = new Sequelize(process.env.RDS_DB_NAME || 'test_db', 
                          process.env.RDS_USERNAME || 'root',
                          process.env.RDS_PASSWORD || null, {
                            host: process.env.RDS_HOSTNAME || '127.0.0.1',
                            port: process.env.RDS_PORT || '3306',
                            dialect: "mysql",
                          });

sequelize.authenticate().then(()=>{
  console.log('Connection has been established successfully.');
}).catch (error =>{
  console.error('Unable to connect to the database');
})

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;