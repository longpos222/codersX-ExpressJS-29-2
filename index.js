const express = require('express');
const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine','pug');

app.get('/',function (req, res) {
  res.render('index',{
    title: 'codersX-ExpressJS',
    message: 'Hello codersX'
  });
});

var todos = ['Đi chợ','Nấu cơm','Rửa bát','Học code tại CodersX']

app.get('/todos', (req, res) => {
  res.render('todos',{
    name: 'Long',
    todos: todos
  });
});

app.listen(port, () => {
console.log(`Server is listening at port http://localhost:${port}/`);
});

