const md5 = require('md5');
const db = require('../db.js');

module.exports.login = (req, res) => {
  res.render('auth/login');
};

module.exports.postLogin = (req, res) => {
  var errors = [];
  var authUser = db.get('users').find({name: req.body.name}).value();

  if(!authUser) {
    res.render('auth/login',{
      errors: ['Username is not existed.'],
      user: authUser
    });
    return;
  }

  if(authUser.password != md5(req.body.password)) {
    res.render('auth/login',{
      errors: ['Wrong password.'],
      user: authUser
    });
    return;
  }
  res.cookie('userId', authUser._id);
  res.redirect('/transactions/');
};