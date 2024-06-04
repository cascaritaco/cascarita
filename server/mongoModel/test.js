const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const testSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Test = mongoose.model("Test", testSchema);

module.exports = Test;
