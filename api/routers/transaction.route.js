const router = require('express').Router();
const controller = require('../controllers/transaction.controller.js');

router.get('/', controller.index);
router.post('/add', controller.add);
router.get('/:_id', controller.info);
router.patch('/:_id', controller.update);
router.delete('/:_id', controller.delete);

module.exports = router;