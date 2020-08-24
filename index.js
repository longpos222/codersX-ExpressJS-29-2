const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const indexRoute = require('./routers/index.route.js');
const bookRoute = require('./routers/book.route.js');
const transactionRoute = require('./routers/transaction.route.js');
const userRoute = require('./routers/user.route.js');
const authRoute = require('./routers/auth.route.js');
const cartRoute = require('./routers/cart.route.js');

const sessionMiddleware = require('./middlewares/session.middleware');
const authMiddleware = require('./middlewares/auth.middleware');

const app = express();
const port = 3000;

app.set('views','./views');
app.set('view engine','pug');

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser("codersx"));
app.use(sessionMiddleware.create);
//app.use(cookieMiddleware.countCookie);

app.use('/', indexRoute);
app.use('/books', bookRoute);
app.use('/transactions', authMiddleware.authRequire, transactionRoute);
app.use('/users', authMiddleware.authRequire,  userRoute);
app.use('/auth', authRoute);
app.use('/cart', cartRoute);

app.listen(port,()=>console.log(`OK http://localhost:${port}`));