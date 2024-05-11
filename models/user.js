const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { allowedPreferences } = require("../constants");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "email not provided"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password not provided"],
  },
  preferences: [
    {
      type: String,
      enum: allowedPreferences,
      default: [allowedPreferences[0]],
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
