const Transaction = require("../../models/transaction.model.js");
const User = require("../../models/user.model.js");
const Book = require("../../models/book.model.js");

const tools = require("../../tools/page.tool.js");

module.exports.index = async (req, res) => {
  var transactions = await Transaction.find({});
  var books = await Book.find({});
  var users = await User.find({});
  var authUser = await User.findOne({ name: req.name });
  console.log(`${req} va ${req.name}`);
  function getDetail(array, Id, tranx, att) {
    var a = array.filter((item) => item._id == tranx[Id]);
    var b = a.map((x) => x[att]);
    return b.toString();
  }

  if (!authUser.isAdmin) {
    transactions = await Transaction.find({ userId: authUser._id });
  } else {
    transactions = transactions;
  }

  if (transactions) {
    transactions = transactions.map((tranx) => {
      var _id = tranx._id;
      var userName = getDetail(users, "userId", tranx, "name");
      var bookTitle = getDetail(books, "bookId", tranx, "title");
      var isComplete = tranx.isComplete;
      return { _id, userName, bookTitle, isComplete };
    });
  } else {
    transactions = {};
  }

  res.json(transactions);
};
