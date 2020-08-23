const db = require('../db.js');
const shortid = require('shortid');

module.exports.index = (req, res) => {
  var q = req.query.q;
  var users = db.get('users').value();
  var filterUsers = users;
  
  if(q) {
    filterUsers = users.filter((val)=>{
      return val.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
  } 

  var page = parseInt(req.query.page) || 1;
  var pageStep = 3;
  var startPage = (page - 1) * pageStep;
  var maxPage = filterUsers.length % pageStep == 0 ? Math.floor(filterUsers.length / pageStep) : Math.floor(filterUsers.length / pageStep) + 1;

  filterUsers = filterUsers.slice(startPage, startPage + pageStep);
  
  var prevPage = (page-1) < 0 ? 0 : (page-1);
  var nextPage = (page+1) > maxPage ? maxPage : (page+1);
  var pageFoot = {prevPage, page, nextPage, maxPage};

  res.render('users/index',{
    users: filterUsers,
    value: q,
    pageFoot
  });
};

module.exports.add = (req, res) => {
  res.render('users/add');
}; 

module.exports.postAdd = (req, res) => {
  req.body._id = shortid();
  db.get('users').push(req.body).write();
  res.redirect('/users');
}; 

module.exports.delete = (req, res) => {
  db.get('users').remove({_id : req.params._id}).write();
  res.redirect('/users');
};

module.exports.update = (req, res) => {
  var [user] = db.get('users').filter({_id : req.params._id}).value();
  res.render('users/update',{
    user: user
  });
};

module.exports.postUpdate = (req, res) => {
  db.get('users')
  .find({_id : req.params._id})
  .assign({name: req.body.name})
  .write();
  res.redirect('/users');
};
