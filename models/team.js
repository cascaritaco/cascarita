'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    static logMessage(message){
      console.log(message);
      return '';
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Team.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};

// describe("createMovie", () => {
//   it("should create a new movie", async () => {
//     // Mock request body
//     const movie = {
//       title: "The Matrix",
//       releaseDate: "1999-03-31",
//       duration: 136,
//     };
    
//     // Queue the result for the Movie.build method
//     Movie.$queueResult(Movie.build(movie));

//     // Call the createMovie controller method
//     const response = await createMovie({ body: movie });

//     // Assertions
//     expect(response.status).toBe(201);
//     expect(response.body.title).toBe(movie.title);
//     expect(response.body.releaseDate).toBe(movie.releaseDate);
//     expect(response.body.duration).toBe(movie.duration);
//   });

//   it("should return 400 if request body is invalid", async () => {
//     // Invalid request body
//     const movie = { title: "The Matrix", duration: 136 };

//     // Call the createMovie controller method
//     const response = await createMovie({ body: movie });

//     // Assertions
//     expect(response.status).toBe(400);
//     expect(response.body.error).toBeDefined();
//   });
// });
