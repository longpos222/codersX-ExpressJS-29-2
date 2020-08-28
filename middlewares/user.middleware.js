module.exports.validateNewUser = (req, res, next) => {
  var errors = [];

  if(!req.body.name) errors.push('User name can not be empty.');

  if(!req.body.email) errors.push('Email can not be empty.');

  if(req.body.name.length > 30) errors.push('User name can not longer than 30 chars.');
  
  if(errors.length) {
    res.render('users/add',{ errors });
    return;
  }

  next();
};