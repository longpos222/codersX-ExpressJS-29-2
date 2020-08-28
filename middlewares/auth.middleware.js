const User = require('../models/user.model.js');

module.exports.authRequire = async (req, res, next) => {
  if(!req.signedCookies.userId) {
    res.redirect('/auth/login');
    return;
  }

  var authUser = await User.findById(req.signedCookies.userId);

  if(!authUser) {
    res.redirect('/auth/login');
    return;
  }

  res.locals.user = authUser;
  
  next();
};