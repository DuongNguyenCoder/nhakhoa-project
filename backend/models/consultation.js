const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    phone: {
      type: String,
      required: true,
      index: true,
    },
    isConfirm: { type: Boolean, required: true, default: false, index: true },
    note: { type: String, required: false },
    message: { type: String, required: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Consultation", consultationSchema);
