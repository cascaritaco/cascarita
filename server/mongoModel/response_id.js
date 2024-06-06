const mongoose = require("mongoose");

const { Schema } = mongoose;

const responseIdSchema = new Schema(
  {
    response_id: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const responseId = mongoose.model("ResponseId", responseIdSchema);

module.exports = responseId;
