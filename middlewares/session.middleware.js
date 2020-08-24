const shortid = require('shortid');
const db = require('../db');

module.exports.create = (req, res, next) => {
  var sessionId = shortid();
  if(!req.signedCookies || !req.signedCookies.sessionId) {
    res.cookie('sessionId', sessionId, {signed : true});
    db.get('sessions').push({"_id": sessionId}).write();
  }

  next();
};