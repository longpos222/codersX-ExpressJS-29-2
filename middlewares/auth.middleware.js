const User = require('../models/user.model.js');
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.authRequire = async (req, res, next) => {
  var accessTokenKey = req.signedCookies.accessTokenKey;

  if (!accessTokenKey) {
    res.redirect('auth/login');
    return;
  }
  
  var isAuth = await jwt.verify(accessTokenKey, process.env.ACCESS_TOKEN_KEY);

  if (!isAuth) {
    res.redirect('auth/login');
    return;
  }
  //req.name = isAuth.name;
  res.locals.user = await User.findOne({name: isAuth.name}); 
  
  next();
};
