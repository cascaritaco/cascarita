// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Team extends Model {

//     static associate(models) {
//       Team.hasMany(models.Plyaer, { foreignKey: 'team_id' });
//     }

//     // static async createTeam({ name }) {
//     //   return await Team.create({ name });
//     // }


//     // static async createTeam({ name }) {
//     //   try {
//     //     const newTeam = await this.create({ name });
//     //     return newTeam;
//     //   } catch (error) {
//     //     console.error('Error creating team:', error);
//     //     throw error;
//     //   }
//     // }

//      static logMessage(message) {
//       console.log('Log from Team model:', message);
//     }
//   }
//   Team.init({
//     name: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Team',
//   });

//   // Team.createTeam = async function ({ name }) {
//   //   const newTeam = await Team.create({ name });
//   //   return newTeam;
//   // };

//   return Team;
// };

'use strict'

// const Team = function(){
//   var logMessage = function(message) {
//           console.log('Log from Team model:', message);
//   }
//         return {
//           logMessage,
//         }
// }

// module.exports = Team();


const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('test_db', 'root', null, {
  host: '127.0.0.1',
  dialect: 'mysql',
});

class Team extends Model {
  static logMessage(message) {
    console.log('Log from Team model:', message);
  }
}

Team.init({
  name: {
    type: DataTypes.STRING,
  },
}, {
  sequelize, // We need to pass the connection instance
  modelName: 'Team' // We need to choose the model name
});

// the defined model is the class itself
//console.log(User === sequelize.models.User); // true