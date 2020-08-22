const db = require('../db');

module.exports.authRequire = (req, res, next) => {
  if(!req.signedCookies.userId) {
    res.redirect('/auth/login');
    return;
  }

  var authUser = db.get('users').find({_id:req.signedCookies.userId}).value();
  if(!authUser) {
    res.redirect('/auth/login');
    return;
  }
  res.locals.user = authUser;
  next();
};