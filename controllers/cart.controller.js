const User = require('../models/user.model.js');
const Session = require('../models/session.model.js');
const Book = require('../models/book.model.js');
const Transaction = require('../models/transaction.model.js');

const tools = require('../tools/page.tool.js');


module.exports.index = async (req, res) => {
  var authUser = await User.findById(req.signedCookies.userId);
  var session = await Session.findById(req.signedCookies.sessionId);
  var books = await Book.find();
  var pageNumber = parseInt(req.query.page) || 1;     
  var cart;
  if(!session || !session.cart) {
    cart = [];
  } else {
    cart = Object.entries(session.cart);
  }

  function getTitle (array, bookId, attribute) {
    var [result] = array.filter(item => item._id == bookId);
    return result[attribute];
  }
  
  pageFoot = tools.page(cart,pageNumber);
  cartFullList = tools.array(cart,pageNumber);
  
  cartFullList = await Object.fromEntries(cartFullList.map(([key, value])=>[getTitle(books,key,'title'),value]));

  res.render('cart/index',
  {
    cart: cartFullList,
    user: authUser,
    pageFoot: pageFoot
  });
};

module.exports.add = async (req, res) => {
  var bookId = req.params._id;
  var sessionId = req.signedCookies.sessionId;
  if (!sessionId) {
    res.redirect("/books");
  }
  //=========================
  //await Session.findByIdAndUpdate(sessionId, { $push: { cart: { bookId : 10 } }}, { upsert: true });
  // => cách này tạo ra cart là 1 array bên trong 'cart' chưa các object đơn lẻ (key: value)
  //========================
  //await Session.findByIdAndUpdate(sessionId, { $inc: {[`cart.${bookId}`] : 1} }, { upsert: true });
  // => cách này tạo ra cart là 1 object bên trong cart chưa 1 object gồm nhiều key: value 
  //==========================
  
  var isExist = await Session.findOne({_id : sessionId, [`cart.${bookId}`]: {$exists : true}});
  
  if(!isExist) {
    await Session.findOneAndUpdate({_id: sessionId}, { $set:  { [`cart.${bookId}`] : 0 } }, { upsert: true });
  }
  await Session.findOneAndUpdate({_id: sessionId},{$inc: {[`cart.${bookId}`] : 1 }});
  
  res.redirect("/books");
};

module.exports.borrow = async (req, res) => {
  var sessionId = req.signedCookies.sessionId;
  var userId = req.signedCookies.userId;
  var session = await Session.findById(sessionId);
  var sessionCart = session.cart || {};

  var cart = Object.keys(sessionCart);
  var user = await User.findById(userId);
  
  if(!user) {
    res.redirect('/auth/login');
    return;
  }
  
  var result = cart.map(item => {
    return {
      "userId": userId,
      "bookId": item,
      "isComplete": true
    };
  });

  await Transaction.insertMany(result);
  await Session.findByIdAndDelete(sessionId);
  res.redirect('/transactions');
};