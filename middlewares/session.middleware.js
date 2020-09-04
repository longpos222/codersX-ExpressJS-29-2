const Session = require("../models/session.model.js");

module.exports.create = async (req, res, next) => {
  if (!req.signedCookies || !req.signedCookies.sessionId) {
    var [session] = await Session.insertMany({});
    res.cookie("sessionId", session._id, { signed: true });
  }
  next();
};
