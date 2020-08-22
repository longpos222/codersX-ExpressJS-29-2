const db = require('../db.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

  if(authUser.wrongLoginCount > 3) {
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
  
  res.cookie('userId', authUser._id, { signed: true});
  res.redirect('/transactions/');
};