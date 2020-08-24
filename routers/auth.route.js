const router = require('express').Router();
const controller = require('../controllers/auth.controller');
const userMiddleware = require('../middlewares/user.middleware');

router.get('/login', controller.login);
router.post('/login', controller.postLogin);
router.get('/logout', controller.logout);

module.exports = router;