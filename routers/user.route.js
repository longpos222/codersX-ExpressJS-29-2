const router = require('express').Router();
const controller = require('../controllers/user.controller');

router.get('/', controller.index);
router.post('/add', controller.add); 
router.get('/:_id/delete', controller.delete);
router.get('/:_id/update', controller.update);
router.post('/:_id/update', controller.postUpdate);

module.exports = router;