const mongoose = require("mongoose");

var categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    isNews: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

//Export the model
module.exports = mongoose.model("Category", categorySchema);
