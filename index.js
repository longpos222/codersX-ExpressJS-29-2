const express = require('express');
const app = express();
const port = 3000;

app.get('/',function (req, res) {
  res.send('Hello world!');
});

app.get('/todos', (req, res) => {
  res.send('<ul><li>Đi chợ</li><li>Nấu cơm</li><li>Rửa bát</li><li>Học code tại CodersX</li></ul>');
}

);

app.listen(port, () => {
console.log('Server is listening at port ', port);
});

