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

app.get('/',function (req, res) {
  res.render('index',{
    title: 'codersX-ExpressJS',
    message: 'codersX Todos App'
  });
});

app.get('/todos', (req, res) => {
  var q = req.query.q;
  var todos = db.get('todos').value();
  if(!q) {
    res.render('todos',{
        todos: todos,
        value: q
      });
  } else {
    filterTodos = todos.filter((val)=>{
      return val.action.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('todos',{
      todos: filterTodos,
      value: q
    });
  }
});

app.post('/todos/create', (req, res) => {
  req.body._id = shortid();
  db.get('todos').push(req.body).write();
  res.redirect('/todos');
}); 

app.get('/todos/:_id/delete', (req, res) => {
  db.get('todos').remove({_id : req.params._id}).write();
  res.redirect('/todos');
});

app.listen(port, () => {
console.log(`Server is listening at port http://localhost:${port}/`);
});

