const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const formsSchema = new Schema(
  {
    form_data: {
      type: Schema.Types.Mixed,
      required: true,
    },

    group_id: {
      type: Number,
    },
  },
  { timestamps: true },
);

const Form = mongoose.model("Form", formsSchema);

module.exports = Form;
