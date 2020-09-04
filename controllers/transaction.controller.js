const Transaction = require('../models/transaction.model.js');
const User = require('../models/user.model.js');
const Book = require('../models/book.model.js');

const tools = require('../tools/page.tool.js');

module.exports.index = async (req, res) => {
  var transactions = await Transaction.find({});
  var books = await Book.find({});
  var users = await User.find({});
  
  var authUser = await User.findOne({name:res.locals.user.name});
  var pageNumber = parseInt(req.query.page) || 1;

  function getDetail(array, Id, tranx, att) {
    var result = array.filter(item => item._id == tranx[Id]);
    var userName = result.map(x => x[att]);    
    return userName;
  }
  
  if(authUser.role == 'user'){
    transactions = await Transaction.find({ userId: authUser._id });
  } else if(authUser.role == 'shop') {
    transactions = await Transaction.find({ shopId: authUser._id });
  } else {
    transactions = transactions;
  }

  // if (!authUser.isAdmin) {
  //   transactions = await Transaction.find({ userId: authUser._id });
  // } else {
  //   transactions = transactions;
  // }
  
  if (transactions) {
    transactions = transactions.map(tranx => {
      var _id = tranx._id;
      var userName = getDetail(users, 'userId', tranx, 'name');
      var bookTitle = getDetail(books, 'bookId', tranx, 'title');
      var isComplete = tranx.isComplete;
      return { _id, userName, bookTitle, isComplete };
    });
  } else {
    transactions = {};
  }

  pageFoot = tools.page(transactions, pageNumber);
  transactions = tools.array(transactions, pageNumber);

  res.render('transactions/index', {
    transactions,
    users,
    books,
    pageFoot
  });
};

module.exports.add = async (req, res) => {
 var shopId = await Book.findById(req.body.bookId);

  await Transaction.findOneAndUpdate({
    userId: req.body.userId,
    bookId: req.body.bookId
  },
  {
    userId: req.body.userId,
    bookId: req.body.bookId,
    shopId: shopId.shopId
  },
  {
    upsert: true
  });
  res.redirect('/transactions');
};

module.exports.complete = async (req, res) => {
  var transaction = await Transaction.findById(req.params._id);

  if (!transaction) {
    res.send(
      '<h2>ID is not existed.</h2></br><h2><a href="/">Home Page</a></h2>'
    );
    return;
  }

  if (!transaction.isComplete) {
    var a = await Transaction.findByIdAndUpdate(
      req.params._id,
      {
        isComplete: true
      },
      {
        upsert: true
      }
    );
  }
  res.redirect("/transactions");
};

module.exports.delete = async (req, res) => {
  await Transaction.findByIdAndDelete(req.params._id);
  res.redirect('/transactions');
};