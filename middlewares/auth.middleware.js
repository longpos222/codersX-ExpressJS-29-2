const { renderFile } = require('pug');
const db = require('../db');

module.exports.authRequire = (req, res, next) => {
  if(!req.cookies.userId) {
    res.redirect('/auth/login');
    return;
  }

  var authUser = db.get('users').find({_id:req.cookies.userId}).value();
  if(!authUser) {
    res.redirect('/auth/login');
    return;
  }
  res.locals.userId = req.cookies.userId;
  next();
};