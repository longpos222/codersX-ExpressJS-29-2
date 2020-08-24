const db = require("../db.js");
const shortid = require("shortid");
const dotenv = require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports.index = (req, res) => {
  var authUser = db
    .get("users")
    .find({ _id: req.signedCookies.userId })
    .value();

  var q = req.query.q;
  var books = db.get("books").value();
  if (!q) {
    res.render("books/index", {
      books: books,
      value: q,
      user: authUser
    });
  } else {
    filterBooks = books.filter(val => {
      return val.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render("books/index", {
      books: filterBooks,
      value: q,
      user: authUser
    });
  }
};

module.exports.add = (req, res) => {
  req.body._id = shortid();
  db.get("books")
    .push(req.body)
    .write();
  res.redirect("/books");
};

module.exports.delete = (req, res) => {
  db.get("books")
    .remove({ _id: req.params._id })
    .write();
  res.redirect("/books");
};

module.exports.detail = (req, res) => {
  var [book] = db
    .get("books")
    .filter({ _id: req.params._id })
    .value();
  res.render("books/detail", {
    book: book
  });
};

module.exports.postUpdate = async (req, res) => {
  var title = req.body.title;
  var book = db
    .get("books")
    .find({ _id: req.params._id })
    .value();

  var cld_upload_stream = await cloudinary.uploader.upload_stream(
    {
      public_id: book._id + "_cover",
      invalidate: true
    },
    (error, result) => {
      if (result) {
        db.get("books")
          .find({ _id: book._id })
          .assign({ coverUrl: result.url })
          .write();
      }
      res.redirect("/books/" + book._id + "/detail");
    }
  );

  if (!req.file && !req.body.title) {
    res.render("books/detail", {
      book: book,
      errors: ["Please key in new title or choose new book cover!"]
    });
  }

  if (req.file && !req.body.title) {
    streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
  }

  if (!req.file && req.body.title) {
    db.get("books")
      .find({ _id: req.params._id })
      .assign({ title: title })
      .write();
    res.redirect("/books/" + book._id + "/detail");
  }
  //Last case:
  db.get("books")
    .find({ _id: req.params._id })
    .assign({ title: title })
    .write();
  streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
};