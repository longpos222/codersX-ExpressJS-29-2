const Transaction = require("../../models/transaction.model.js");
const User = require("../../models/user.model.js");
const Book = require("../../models/book.model.js");

const tools = require("../../tools/page.tool.js");

module.exports.index = async (req, res) => {
  var transactions = await Transaction.find({});
  var books = await Book.find({});
  var users = await User.find({});
  var authUser = await User.findOne({ name: req.name });

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

module.exports.add = async (req, res) => {
  var isExit = await Transaction.find({
    userId: req.body.userId,
    bookId: req.body.bookId,
  });

  if (isExit.length != 0) {
    return res.status(403).send("This transaction is existed.");
  }

  var result = await Transaction.findOneAndUpdate(
    {
      userId: req.body.userId,
      bookId: req.body.bookId,
    },
    {
      userId: req.body.userId,
      bookId: req.body.bookId,
    },
    {
      upsert: true,
    }
  );
  res.status(200).send(`Your new transactions added: ${result}`);
};

module.exports.info = async (req, res) => {
  var books = await Book.find({});
  var users = await User.find({});

  var authUser = await User.findOne({ name: req.name });
  var transaction = await Transaction.find({ _id: req.params._id });

  if (transaction.length == 0)
    return res.status(404).send("Tranx is not exists.");

  function getDetail(array, Id, tranx, att) {
    var a = array.filter((item) => item._id == tranx[Id]);
    var b = a.map((x) => x[att]);
    return b.toString();
  }
  isBelong = await Transaction.find({
    _id: req.params._id,
    userId: authUser._id,
  });

  if (!authUser.isAdmin && isBelong.length == 0) {
    return res.status(404).send("You don't have right.");
  }

  transaction = transaction.map((tranx) => {
    var _id = tranx._id;
    var userName = getDetail(users, "userId", tranx, "name");
    var bookTitle = getDetail(books, "bookId", tranx, "title");
    var isComplete = tranx.isComplete;
    return { _id, userName, bookTitle, isComplete };
  });

  res.json(transaction);
};

module.exports.update = async (req, res) => {
  var authUser = await User.findOne({ name: req.name });
  var transaction = await Transaction.find({ _id: req.params._id });

  if (transaction.length == 0)
    return res.status(404).send("Tranx is not exists.");

  function getDetail(array, Id, tranx, att) {
    var a = array.filter((item) => item._id == tranx[Id]);
    var b = a.map((x) => x[att]);
    return b.toString();
  }
  isBelong = await Transaction.find({
    _id: req.params._id,
    userId: authUser._id,
  });

  if (!authUser.isAdmin && isBelong.length == 0) {
    return res.status(404).send("You don't have right.");
  }

  var result = await Transaction.findByIdAndUpdate(req.params._id, {
    isComplete: true,
  });

  res.json(
    `You changed Tranx ID ${result._id}'s status to ${
      result.isComplete ? "Done" : "Pending"
    }`
  );
};

module.exports.delete = async (req, res) => {
  var authUser = await User.findOne({ name: req.name });
  var transaction = await Transaction.find({ _id: req.params._id });

  if (transaction.length == 0)
    return res.status(404).send("Tranx is not exists.");

  function getDetail(array, Id, tranx, att) {
    var a = array.filter((item) => item._id == tranx[Id]);
    var b = a.map((x) => x[att]);
    return b.toString();
  }
  isBelong = await Transaction.find({
    _id: req.params._id,
    userId: authUser._id,
  });

  if (!authUser.isAdmin && isBelong.length == 0) {
    return res.status(404).send(`You don't have right.`);
  }

  var result = await Transaction.findByIdAndDelete(req.params._id);

  res.json(`You deleted Tranx ID ${result._id}.`);
};
