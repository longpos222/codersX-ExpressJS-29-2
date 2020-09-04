require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const tools = require("../tools/page.tool.js");

const Book = require("../models/book.model.js");
const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");




module.exports.index = async (req, res) => {
  var pageNumber = parseInt(req.query.page) || 1;
  var authUser;
  if (req.signedCookies.accessTokenKey) {
    authUser = await jwt.verify(
      req.signedCookies.accessTokenKey,
      process.env.ACCESS_TOKEN_KEY
    );
  }
  var q = req.query.q;
  var books = await Book.find({});
  var pageFoot;

  if (authUser && authUser.role == "shop") {
    books = await Book.find({ shopId: authUser.id });
  }

  if (!q) {
    pageFoot = tools.page(books, pageNumber);
    books = tools.array(books, pageNumber);
  } else {
    var filterBooks = books.filter((val) => {
      return val.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    pageFoot = tools.page(filterBooks, pageNumber);
    books = tools.array(filterBooks, pageNumber);
  }

  res.render("books/index", {
    books: books,
    value: q,
    user: authUser,
    pageFoot: pageFoot,
  });
};