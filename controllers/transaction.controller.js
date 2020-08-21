const db = require('../db');
const shortid = require('shortid');

module.exports.index = (req, res) => {
  var transactions = db.get('transactions').value();
  var books = db.get('books').value();
  var users = db.get('users').value();
  var authUser = db.get('users').find({_id: req.cookies.userId}).value();

  if(!authUser.isAdmin) {
    transactions = [
      db.get('transactions')
        .find({userId: req.cookies.userId})
        .value()
    ];
  }

  function getDetail (array, Id, tranx, att) {
    var [result] = array.filter(item => item._id == tranx[Id]);
    return result[att];
  }
  
  transactions = transactions.map(tranx => {
    var _id = tranx._id;
    var userName = getDetail(users,"userId",tranx,"name");
    var bookTitle = getDetail(books,"bookId",tranx,"title");
    return {_id, userName, bookTitle};
  });
  res.render('transactions/index',{
    transactions,
    users,
    books
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