const router = require('express').Router();
const controller = require('../controllers/shop.controller.js');
const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()});

router.get('/:_id', controller.index);
// router.post('/add', controller.add); 
// router.get('/:_id/delete', controller.delete);
// router.get('/:_id/detail', controller.detail);
// router.post('/:_id/detail', upload.single('book-cover'), controller.postUpdate);

module.exports = router;