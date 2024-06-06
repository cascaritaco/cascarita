const mongoose = require("mongoose");

const { Schema } = mongoose;

const rawResponseSchema = new Schema(
  {
    raw_response_data: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true },
);

const rawResponse = mongoose.model("RawResponse", rawResponseSchema);

module.exports = rawResponse;
