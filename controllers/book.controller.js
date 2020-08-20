const db = require('../db.js');
const shortid = require('shortid');

module.exports.index = (req, res) => {
  var q = req.query.q;
  var books = db.get('books').value();
  if(!q) {
    res.render('books/index',{
        books: books,
        value: q
      });
  } else {
    filterBooks = books.filter((val)=>{
      return val.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('books/index',{
      books: filterBooks,
      value: q
    });
  }
};

module.exports.add =  (req, res) => {
  req.body._id = shortid();
  db.get('books').push(req.body).write();
  res.redirect('/books');
}; 

module.exports.delete = (req, res) => {
  db.get('books').remove({_id : req.params._id}).write();
  res.redirect('/books');
};

module.exports.update = (req, res) => {
  var [book] = db.get('books').filter({_id : req.params._id}).value();
  res.render('books/update',{
    book: book
  });
};

module.exports.postUpdate = (req, res) => {
  db.get('books')
  .find({_id : req.params._id})
  .assign({title: req.body.title})
  .write();
  res.redirect('/books');

};