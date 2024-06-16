"use strict";
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

    created_by: {
      type: Schema.Types.Mixed,
      required: true,
    },

    updated_by: {
      type: Schema.Types.Mixed,
      required: false,
    },
  },
  { timestamps: true },
);

const Form = mongoose.model("Form", formsSchema);

module.exports = Form;
