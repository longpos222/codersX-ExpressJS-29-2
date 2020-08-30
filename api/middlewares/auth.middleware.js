const User = require('../../models/user.model.js');
const jwt = require('jsonwebtoken');

require('dotenv').config();
module.exports.apiAuthRequire = async (req, res, next) => {
  var header = req.headers.authorization;
  if(!header) {
    res.status(403).send('Header is unvalid.');
    return;
  }
  var accessTokenKey = header.split(" ")[1];
  
  var isAuth = await jwt.verify(accessTokenKey, process.env.ACCESS_TOKEN_KEY);
  if(!isAuth) {
    res.status(403).send('Could not connect to the protected route');
  }
  req.name = isAuth.name;
  next();
};