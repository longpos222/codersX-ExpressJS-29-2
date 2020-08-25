const router = require('express').Router();
const controller = require('../controllers/cart.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');


router.get('/', controller.index);
router.get('/add/:_id', controller.add); 
router.get('/borrow',authMiddleware.authRequire, controller.borrow); 

module.exports = router;