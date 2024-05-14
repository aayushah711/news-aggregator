const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { allowedPreferences } = require("../constants");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  preferences: {
    type: [
      {
        type: String,
        enum: allowedPreferences,
      },
    ],
    default: [allowedPreferences[0]],
  },
});

module.exports = mongoose.model("User", userSchema);
