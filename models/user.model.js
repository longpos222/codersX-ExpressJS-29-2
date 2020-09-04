const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name : String,
  email: String,
  phone: String,
  isAdmin: Boolean,
  role : String, // ['user', 'shop', 'GOD']
  wrongLoginCount: Number,
  avatarUrl: String,
  password: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;