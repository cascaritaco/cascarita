"use strict";
const mongoose = require("mongoose");

const { Schema } = mongoose;

const responseIdSchema = new Schema(
  {
    form_id: {
      type: String,
      required: true,
    },
    unique_ids: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true },
);

const responseId = mongoose.model("ResponseId", responseIdSchema);

module.exports = responseId;
