const db = require('../db');
const shortid = require('shortid');

module.exports.index = (req, res) => {
  var transactions = db.get('transactions').value();
  var books = db.get('books').value();
  var users = db.get('users').value();
  var authUser = db.get('users').find({_id: req.signedCookies.userId}).value();
  
  function getDetail (array, Id, tranx, att) {
    var [result] = array.filter(item => item._id == tranx[Id]);
    return result[att];
  }

  if(!authUser.isAdmin) {
    transactions =
      db.get('transactions')
        .filter({userId: req.signedCookies.userId})
        .value();
  } else {
    transactions = transactions;
  }
  
  transactions = transactions.map(tranx => {
    var _id = tranx._id;
    var userName = getDetail(users,"userId",tranx,"name");
    var bookTitle = getDetail(books,"bookId",tranx,"title");
    return {_id, userName, bookTitle};
  });

  var page = parseInt(req.query.page) || 1;
  var pageStep = 3;
  var startPage = (page - 1) * pageStep;
  var maxPage = transactions.length % pageStep == 0 ? Math.floor(transactions.length / pageStep) : Math.floor(transactions.length / pageStep) + 1;

  var prevPage = (page-1) < 0 ? 0 : (page-1);
  var nextPage = (page+1) > maxPage ? maxPage : (page+1);
  var pageFoot = {prevPage, page, nextPage, maxPage};
  
  transactions = transactions.slice(startPage, startPage + pageStep);
  res.render('transactions/index',{
    transactions,
    users,
    books,
    pageFoot
  });
};

module.exports.add = (req, res) => {
  req.body._id = shortid();
  db.get('transactions').push(req.body).write();
  res.redirect('/transactions');
};

module.exports.complete = (req, res) => {  
  var transactions = db
    .get('transactions')
    .find({_id : req.params._id})
    .value();

  if(!transactions) {
    res.send('<h2>ID is not existed.</h2></br><h2><a href="/">Home Page</a></h2>')
    return;
  }
    
  if(!transactions.isComplete){
    db
    .get('transactions')
    .find({_id : req.params._id})
    .assign({isComplete: true})
    .write();
  }
  res.redirect('/transactions');
};