const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const mongoose = require("mongoose");
require("dotenv").config();
var path = require('path');

//---
//=>give the object after update was applied
mongoose.set("returnOriginal", false);
//----
mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log(`we\'re connected to dbs!`);
});

const indexRoute = require("./routers/index.route.js");
const bookRoute = require("./routers/book.route.js");
const transactionRoute = require("./routers/transaction.route.js");
const userRoute = require("./routers/user.route.js");
const authRoute = require("./routers/auth.route.js");
const cartRoute = require("./routers/cart.route.js");
const apiTransactionRoute = require("./api/routers/transaction.route.js");
const apiAuthRoute = require("./api/routers/auth.route.js");

const sessionMiddleware = require("./middlewares/session.middleware");
const authMiddleware = require("./middlewares/auth.middleware");
const apiAuthMiddleware = require("./api/middlewares/auth.middleware.js");

const app = express();
const port = 3000;

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SIGNED_COOKIE_KEY));
app.use(sessionMiddleware.create);

app.use("/", indexRoute);
app.use("/books", bookRoute);
app.use("/transactions", authMiddleware.authRequire, transactionRoute);
app.use("/users", authMiddleware.authRequire, userRoute);
app.use("/auth", authRoute);
app.use("/cart", cartRoute);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/auth", apiAuthRoute);
app.use("/api/transactions", apiAuthMiddleware, apiTransactionRoute);

app.listen(port, () => console.log(`OK ${port}`));