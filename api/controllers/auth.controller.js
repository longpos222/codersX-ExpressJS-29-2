const User = require('../../models/user.model.js');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv').config();

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.login = async (req, res) => {
  var name = req.body.name;
  var password = req.body.password;
  var errors = [];
  var authUser = await User.findOne({name: name});
  if(!authUser) return res.status(404).send('Username is not existed.');

  const msg = {
    to: authUser.email,
    from: process.env.SENDGRID_EMAIL,
    subject: "Security alert: new or unusual login",
    text: "Looks like there was a login attempt from a new device or location. Your account has been locked.",
    html: "<strong>Your account has been locked.</strong>"
  };

  if(authUser.wrongLoginCount > 3) {
    sgMail.send(msg);
    res.status(403).send('Your account is locked.');
    return;
  }

  var result = await bcrypt.compare(password, authUser._doc.password);
  if(!result) {
    await User.findOneAndUpdate({name: name}, {$inc: { wrongLoginCount: 1 }});
    res.status(403).send('Wrong password.');
    return;
  }
  
  var accessTokenKey = jwt.sign({
    name: name
  }, 
  process.env.ACCESS_TOKEN_KEY, 
  { 
    expiresIn: '1h' 
  });
  res.json({
    accessTokenKey:accessTokenKey
  });
};

module.exports.logout = (req, res) => {
  res.cookie('userId',"", {signed: true});
  res.redirect('/auth/login');
};