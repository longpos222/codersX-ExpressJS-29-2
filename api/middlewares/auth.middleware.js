const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.apiAuthRequire = async (req, res, next) => {
  var accessTokenKey = req.signedCookies.accessTokenKey;
  console.log(accessTokenKey);
  
  if (accessTokenKey == "log_out") {
    res.status(403).send("You are logout. Please log in again.");
    return;
  }

  if (!accessTokenKey) {
    res.status(403).send("Token is invalid.");
    return;
  }
  // accessTokenKey = accessTokenKey.split(" ")[1];
  var isAuth = await jwt.verify(accessTokenKey, process.env.ACCESS_TOKEN_KEY);
  console.log(`!: ${!isAuth} va ${!!  isAuth}`);
  if (!isAuth) {
    res.status(403).send("Could not connect to the protected route");
    return;
  }
  req.name = isAuth.name;
  next();
};
