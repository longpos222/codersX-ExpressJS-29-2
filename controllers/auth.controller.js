const db = require('../db.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv').config();

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.login = (req, res) => {
  res.render('auth/login');
};

module.exports.postLogin = async (req, res) => {
  var errors = [];
  var authUser = db.get('users').find({name: req.body.name}).value();

  if(!authUser) {
    res.render('auth/login',{
      errors: ['Username is not existed.'],
      user: authUser
    });
    return;
  }

  const msg = {
    to: authUser.email,
    from: process.env.SENDGRID_EMAIL,
    subject: "Security alert: new or unusual login",
    text:
      "Looks like there was a login attempt from a new device or location. Your account has been locked.",
    html: "<strong>Your account has been locked.</strong>"
  };

  if(authUser.wrongLoginCount > 3) {
    sgMail.send(msg);
    res.render('auth/login',{
      errors: ['Your account is locked.'],
      user: authUser
    });
    return;
  }
  var result = await bcrypt.compare(req.body.password, authUser.password);

  if(!result) {
    db.get('users').find({name: req.body.name}).update('wrongLoginCount', n => n + 1)
    .write();

    res.render('auth/login',{
      errors: ['Wrong password.'],
      user: authUser
    });
    return;
  }
  
  res.cookie('userId', authUser._id, {signed: true});
  res.redirect('/transactions/');
};