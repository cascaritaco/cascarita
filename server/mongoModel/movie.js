const mongoose = require("mongoose");

const { Schema } = mongoose;

const movieSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },

    release_year: {
      type: Schema.Types.Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
