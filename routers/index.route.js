const express = require('express');
const router = express.Router();

router.get('/',function (req, res) {
  res.render('index',{
    title: 'Book Store App',
    message: 'codersX Book Store App'
  });
});

module.exports = router;