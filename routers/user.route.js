const router = require('express').Router();
const controller = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');
const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()});


router.get('/', controller.index);
router.get('/add', controller.add);
router.post('/add', userMiddleware.validateNewUser, controller.postAdd); 
router.get('/:_id/delete', controller.delete);
router.get('/:_id/update', controller.update);
router.post('/:_id/update', controller.postUpdate);
router.get('/profile', controller.profile);
router.get('/profile/avatar', controller.avatar);
router.post('/profile/avatar', upload.single('avatar'), controller.updateAvatar);

module.exports = router;