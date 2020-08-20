module.exports.index = function (req, res) {
  res.render('index',{
    title: 'Book Store App',
    message: 'codersX Book Store App'
  });
};