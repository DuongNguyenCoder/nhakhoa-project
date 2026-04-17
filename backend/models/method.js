const mongoose = require("mongoose");

var methodSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

//Export the model
module.exports = mongoose.model("Method", methodSchema);
