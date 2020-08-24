const db = require("../db");
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
  var q = req.query.q;
  var users = db.get('users').value();
  var filterUsers = users;
  
  if(q) {
    filterUsers = users.filter((val)=>{
      return val.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
  } 

  var page = parseInt(req.query.page) || 1;
  var pageStep = 3;
  var startPage = (page - 1) * pageStep;
  var maxPage = filterUsers.length % pageStep == 0 ? Math.floor(filterUsers.length / pageStep) : Math.floor(filterUsers.length / pageStep) + 1;

  filterUsers = filterUsers.slice(startPage, startPage + pageStep);
  
  var prevPage = (page-1) < 0 ? 0 : (page-1);
  var nextPage = (page+1) > maxPage ? maxPage : (page+1);
  var pageFoot = {prevPage, page, nextPage, maxPage};

  res.render('users/index',{
    users: filterUsers,
    value: q,
    pageFoot
  });
};

module.exports.add = (req, res) => {
  res.render('users/add');
}; 

module.exports.postAdd = (req, res) => {
  req.body._id = shortid();
  db.get('users').push(req.body).write();
  res.redirect('/users');
}; 

module.exports.delete = (req, res) => {
  db.get('users').remove({_id : req.params._id}).write();
  res.redirect('/users');
};

module.exports.update = (req, res) => {
  var [user] = db.get('users').filter({_id : req.params._id}).value();
  res.render('users/update',{
    user: user
  });
};

module.exports.postUpdate = (req, res) => {
  db.get('users')
  .find({_id : req.params._id})
  .assign({name: req.body.name})
  .write();
  res.redirect('/users');
};

module.exports.profile = (req, res) => {
  var authUser = db
    .get('users')
    .find({_id: req.signedCookies.userId})
    .value();

  res.render('users/profile',{
    users: authUser
  });
};

module.exports.avatar = (req, res) => {
  var authUser = db
    .get('users')
    .find({_id: req.signedCookies.userId})
    .value();

  res.render('users/avatar',{
    users: authUser
  });
};

module.exports.updateAvatar = async (req, res) => {
  var authUser = db
    .get("users")
    .find({ _id: req.signedCookies.userId })
    .value();

  let cld_upload_stream = await cloudinary.uploader.upload_stream(
    {
      public_id: authUser._id + "_avatar",
      invalidate: true
    },
    (error, result) => {
      db.get("users")
        .find({ _id: authUser._id })
        .assign({ avatarUrl: result.url })
        .write();
      res.redirect("/users/profile");
    }
  );
  streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
};