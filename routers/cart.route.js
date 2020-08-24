const router = require('express').Router();
const controller = require('../controllers/cart.controller.js');

router.get('/', controller.index);
router.get('/add/:_id', controller.add); 
router.get('/borrow', controller.borrow); 

module.exports = router;