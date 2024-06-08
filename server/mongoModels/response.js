"use strict";
const mongoose = require("mongoose");

const { Schema } = mongoose;

const responseSchema = new Schema(
  {
    form_id: {
      type: String,
      required: true,
    },
    response: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true },
);

const response = mongoose.model("Response", responseSchema);

module.exports = response;
