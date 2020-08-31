const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  var accessTokenKey = req.signedCookies.accessTokenKey;
  
  if (accessTokenKey == "log_out") {
    res.status(403).send("You are logout. Please log in again.");
    return;
  }

  if (!accessTokenKey) {
    res.status(403).send("Token is invalid.");
    return;
  }
  var isAuth = await jwt.verify(accessTokenKey, process.env.ACCESS_TOKEN_KEY);
  if (!isAuth) {
    res.status(403).send("Could not connect to the protected route");
    return;
  }
  req.name = isAuth.name;
  next();
};
