const express = require('express');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');

const app = express();
const port = 3000;
const adapter = new FileSync('db.json');
const db = low(adapter);

app.set('views', './views');
app.set('view engine','pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
//======HOME PAGE=================================================
app.get('/',function (req, res) {
  res.render('index',{
    title: 'Book Store App',
    message: 'codersX Book Store App'
  });
});

//=======BOOKS=====================================================
app.get('/books', (req, res) => {
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

app.post('/books/add', (req, res) => {
  req.body._id = shortid();
  db.get('books').push(req.body).write();
  res.redirect('/books');
}); 

app.get('/books/:_id/delete', (req, res) => {
  db.get('books').remove({_id : req.params._id}).write();
  res.redirect('/books');
});

app.get('/books/:_id/update', (req, res) => {
  var [book] = db.get('books').filter({_id : req.params._id}).value();
  res.render('books/update',{
    book: book
  });
});

app.post('/books/:_id/update', (req, res) => {
  db.get('books')
  .find({_id : req.params._id})
  .assign({title: req.body.title})
  .write();
  res.redirect('/books');

});

//========USERS==============================================
app.get('/users', (req, res) => {
  var q = req.query.q;
  var users = db.get('users').value();
  if(!q) {
    res.render('users/index',{
        users: users,
        value: q
      });
  } else {
    filterUsers = users.filter((val)=>{
      return val.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index',{
      users: filterUsers,
      value: q
    });
  }
});

app.post('/users/add', (req, res) => {
  req.body._id = shortid();
  db.get('users').push(req.body).write();
  res.redirect('/users');
}); 

app.get('/users/:_id/delete', (req, res) => {
  db.get('users').remove({_id : req.params._id}).write();
  res.redirect('/users');
});

app.get('/users/:_id/update', (req, res) => {
  var [user] = db.get('users').filter({_id : req.params._id}).value();
  res.render('users/update',{
    user: user
  });
});

app.post('/users/:_id/update', (req, res) => {
  db.get('users')
  .find({_id : req.params._id})
  .assign({name: req.body.name})
  .write();
  res.redirect('/users');

});

//======================================
app.listen(port, () => {
console.log(`Server is running at http://localhost:${port}/`);
});