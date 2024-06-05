const mongoose = require("mongoose");

const { Schema } = mongoose;

const formsSchema = new Schema(
  {
    form_data: {
      type: Schema.Types.Mixed,
      required: true,
    },

    form_blueprint: {
      type: Schema.Types.Mixed,
      required: true,
    },

    group_id: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Form = mongoose.model("Form", formsSchema);

module.exports = Form;
