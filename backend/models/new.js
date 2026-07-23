const mongoose = require("mongoose");

var newSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    overview: {
      type: String,
      require: false,
    },
    description: {
      type: String,
      required: false,
    },
    newPic: {
      type: String,
      required: true,
    },
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
    isActive: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    hasPdf: {
      type: Boolean,
      default: false,
    },
    pdfFile: {
      type: String,
    },
  },
  { timestamps: true },
);

//Export the model
module.exports = mongoose.model("New", newSchema);
