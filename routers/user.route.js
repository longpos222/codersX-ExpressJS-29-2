const router = require('express').Router();
const controller = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');

router.get('/', controller.index);
router.get('/add', controller.add);
router.post('/add', userMiddleware.validateNewUser,controller.postAdd); 
router.get('/:_id/delete', controller.delete);
router.get('/:_id/update', controller.update);
router.post('/:_id/update', controller.postUpdate);

module.exports = router;