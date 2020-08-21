const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')


const indexRoute = require('./routers/index.route.js');
const bookRoute = require('./routers/book.route.js');
const transactionRoute = require('./routers/transaction.route.js');
const userRoute = require('./routers/user.route.js');
const cookieMiddleware = require('./middlewares/cookie.middleware');

const app = express();
const port = 3000;

app.set('views','./views');
app.set('view engine','pug');

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());
app.use(cookieMiddleware.createCookie);
app.use(cookieMiddleware.countCookie);

app.use('/', indexRoute);
app.use('/books', bookRoute);
app.use('/transactions', transactionRoute);
app.use('/users', userRoute);

app.listen(port,()=>console.log(`OK ${port}`));