const db = require('../db');
const shortid = require('shortid');

module.exports.index = (req, res) => {
  var transactions = db.get('transactions').value();
  var books = db.get('books').value();
  var users = db.get('users').value();
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