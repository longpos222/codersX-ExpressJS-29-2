const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  cart : Object,
  userId: String,
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;