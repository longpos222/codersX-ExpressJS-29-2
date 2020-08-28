const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name : String,
  email: String,
  phone: String,
  isAdmin: Boolean,
  wrongLoginCount: Number,
  avatarUrl: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;