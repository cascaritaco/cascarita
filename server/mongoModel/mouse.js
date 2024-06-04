const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const mouseSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
});

const Mouse = mongoose.model("Mouse", mouseSchema);

module.exports = Mouse;
