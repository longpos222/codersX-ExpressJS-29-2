require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const tools = require('../tools/page.tool.js');

const Book = require('../models/book.model.js');
const User = require('../models/user.model.js');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports.index = async (req, res) => {
  var pageNumber = parseInt(req.query.page) || 1;
  var authUser = await User.findById(req.signedCookies.userId);
  var q = req.query.q;
  var books = await Book.find({});
  var pageFoot;

  if (!q) {
    pageFoot = tools.page(books,pageNumber);
    books = tools.array(books,pageNumber);
  } else {
    var filterBooks = books.filter(val => {
      return val.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    pageFoot = tools.page(filterBooks,pageNumber);
    books = tools.array(filterBooks,pageNumber);
  }

  res.render("books/index", {
    books: books,
    value: q,
    user: authUser,
    pageFoot: pageFoot
  });

};

module.exports.add = async (req, res) => {
  await Book.findOneAndUpdate({
    title: req.body.title,
    description: req.body.description
  },
  {
    title: req.body.title,
    description: req.body.description
  },{
    upsert: true
  });
  res.redirect("/books");
};

module.exports.delete = async (req, res) => {
  await Book.findByIdAndDelete(req.params._id);
  res.redirect("/books");
};

module.exports.detail = async (req, res) => {
  var book = await Book.findById(req.params._id);
  res.render("books/detail", {
    book: book
  });
};

module.exports.postUpdate = async (req, res) => {
  var title = req.body.title;
  var book = await Book.find({ _id: req.params._id });
  var cld_upload_stream = await cloudinary.uploader.upload_stream(
    {
      public_id: book._id + "_cover",
      invalidate: true
    },
    async (error, result) => {
      if (result) {        
        await Book.findByIdAndUpdate(req.params._id,{ coverUrl: result.url });
      }
      res.redirect("/books/" + book._id + "/detail");
    }
  );

  if (!req.file && !req.body.title) {
    res.render("books/detail", {
      book: book,
      errors: ["Please key in new title or choose new book cover!"]
    });
    return;
  }

  if (req.file && !req.body.title) {
    streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
    return;
  }

  if (!req.file && req.body.title) {
    await Book.findByIdAndUpdate(req.params._id,{ title: title });
    res.redirect("/books/" + book._id + "/detail");
    return;
  }
  //Last case:
  await Book.findByIdAndUpdate(req.params._id,{ title: title });
  streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
};