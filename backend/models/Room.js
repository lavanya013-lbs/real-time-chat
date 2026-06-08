const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Room", roomSchema);