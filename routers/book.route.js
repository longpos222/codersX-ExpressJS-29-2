const express = require('express');
const router = express.Router();
const db = require('../db.js');
const shortid = require('shortid');

router.get('/', (req, res) => {
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
});

router.post('/add', (req, res) => {
  req.body._id = shortid();
  db.get('books').push(req.body).write();
  res.redirect('/books');
}); 

router.get('/:_id/delete', (req, res) => {
  db.get('books').remove({_id : req.params._id}).write();
  res.redirect('/books');
});

router.get('/:_id/update', (req, res) => {
  var [book] = db.get('books').filter({_id : req.params._id}).value();
  res.render('books/update',{
    book: book
  });
});

router.post('/:_id/update', (req, res) => {
  db.get('books')
  .find({_id : req.params._id})
  .assign({title: req.body.title})
  .write();
  res.redirect('/books');

});

module.exports = router;