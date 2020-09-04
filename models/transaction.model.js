const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId : String,
  bookId: String,
  isComplete: Boolean,
  shopId: String,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;